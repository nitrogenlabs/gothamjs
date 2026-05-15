type StoryContext = {
  readonly canvasElement: HTMLElement;
};

const preventAnchorNavigation = (element: HTMLElement) => {
  const anchor = element.closest('a[href]');

  if(anchor instanceof HTMLAnchorElement) {
    anchor.addEventListener('click', event => event.preventDefault(), {capture: true, once: true});
  }
};

export const interactWithCanvas = async ({canvasElement}: StoryContext) => {
  await Promise.resolve();

  const field = canvasElement.querySelector('input:not([type="file"]), textarea') as HTMLInputElement | HTMLTextAreaElement | null;

  if(field && !field.disabled && !field.readOnly) {
    field.focus();
    field.value = field instanceof HTMLTextAreaElement ? 'Story interaction note' : 'Story interaction';
    field.dispatchEvent(new Event('input', {bubbles: true}));
    field.dispatchEvent(new Event('change', {bubbles: true}));
    field.blur();
  }

  const clickable = canvasElement.querySelector('button:not([disabled]), a[href], [role="button"]') as HTMLElement | null;

  if(clickable) {
    clickable.focus();
    preventAnchorNavigation(clickable);
    clickable.click();
  }
};

export const focusCanvas = async ({canvasElement}: StoryContext) => {
  await Promise.resolve();

  const focusable = canvasElement.querySelector('button, a[href], input, textarea, [tabindex]') as HTMLElement | null;
  focusable?.focus();
};
