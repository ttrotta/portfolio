import { useEffect, useRef, useState } from "react";

export type FrameSubscriber = (time: number, delta: number) => void;

type Subscription = { callback: FrameSubscriber; owner: string };

class FrameCoordinator {
  private subscriptions = new Set<Subscription>();
  private activeOwners = new Set<string>();
  private frame: number | null = null;
  private lastTime = 0;
  private paused = false;

  subscribe(callback: FrameSubscriber, owner = "global") {
    const subscription = { callback, owner };
    this.subscriptions.add(subscription);
    this.activeOwners.add(owner);
    this.ensureRunning();

    return () => {
      this.subscriptions.delete(subscription);
      if (![...this.subscriptions].some((item) => item.owner === owner)) {
        this.activeOwners.delete(owner);
      }
      if (!this.subscriptions.size && this.frame !== null) {
        cancelAnimationFrame(this.frame);
        this.frame = null;
      }
    };
  }

  setOwnerActive(owner: string, active: boolean) {
    if (active) this.activeOwners.add(owner);
    else this.activeOwners.delete(owner);
  }

  disposeOwner(owner: string) {
    [...this.subscriptions]
      .filter((subscription) => subscription.owner === owner)
      .forEach((subscription) => this.subscriptions.delete(subscription));
    this.activeOwners.delete(owner);
  }

  setPaused(paused: boolean) {
    this.paused = paused;
  }

  private ensureRunning() {
    if (this.frame === null && typeof window !== "undefined") {
      this.lastTime = performance.now();
      this.frame = requestAnimationFrame(this.tick);
    }
  }

  private tick = (time: number) => {
    const delta = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;
    this.frame = null;

    if (!this.paused) {
      this.subscriptions.forEach(({ callback, owner }) => {
        if (this.activeOwners.has(owner)) callback(time, delta);
      });
    }

    if (this.subscriptions.size) this.ensureRunning();
  };
}

export const frameCoordinator = new FrameCoordinator();

export function useSceneLifecycle(owner: string) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateVisibility = (nextVisible: boolean) => {
      setVisible(nextVisible);
      frameCoordinator.setOwnerActive(owner, nextVisible && !document.hidden);
    };
    const observer = new IntersectionObserver(
      ([entry]) => updateVisibility(entry.isIntersecting),
      { threshold: 0.01 },
    );
    const handleVisibility = () => updateVisibility(!document.hidden);

    observer.observe(element);
    document.addEventListener("visibilitychange", handleVisibility);
    updateVisibility(true);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      frameCoordinator.disposeOwner(owner);
    };
  }, [owner]);

  return { elementRef, visible };
}
