/*
  el-transition 0.0.7 ported to TypeScript
  Original work: https://github.com/mmccall10/el-transition
  Original Authors: Mike McCall and Yujin Won
  Licence: MIT
*/
export async function enter(element: HTMLElement | null, transitionName: string | null = null) {
  if (!element) {
    return;
  }
  element.classList.remove("hidden");
  await transition("enter", element, transitionName);
}

export async function leave(element: HTMLElement | null, transitionName: string | null = null) {
  if (!element) {
    return;
  }
  await transition("leave", element, transitionName);
  element.classList.add("hidden");
}

export async function toggle(element: HTMLElement | null, transitionName: string | null = null) {
  if (!element) {
    return;
  }
  if (element.classList.contains("hidden")) {
    await enter(element, transitionName);
  } else {
    await leave(element, transitionName);
  }
}

async function transition(direction: string, element: HTMLElement, animation: string | null) {
  const dataset = element.dataset;
  const animationClass = animation ? `${animation}-${direction}` : direction;
  const transition = `transition${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
  const genesis = (dataset[transition] ? dataset[transition]?.split(" ") : [animationClass]) as string[];
  const start = (
    dataset[`${transition}Start`] ? dataset[`${transition}Start`]?.split(" ") : [`${animationClass}-start`]
  ) as string[];
  const end = (
    dataset[`${transition}End`] ? dataset[`${transition}End`]?.split(" ") : [`${animationClass}-end`]
  ) as string[];

  addClasses(element, genesis);
  addClasses(element, start);
  await nextFrame();
  removeClasses(element, start);
  addClasses(element, end);
  await afterTransition(element);
  removeClasses(element, end);
  removeClasses(element, genesis);
}

function addClasses(element: HTMLElement, classes: Array<string>) {
  element.classList.add(...classes);
}

function removeClasses(element: HTMLElement, classes: Array<string>) {
  element.classList.remove(...classes);
}

function nextFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

function afterTransition(element: HTMLElement) {
  return new Promise<void>((resolve) => {
    // safari return string with comma separate values
    const computedDuration = getComputedStyle(element).transitionDuration.split(",")[0];
    const duration = Number(computedDuration.replace("s", "")) * 1000;
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
