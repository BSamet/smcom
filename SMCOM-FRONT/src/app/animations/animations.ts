import {animate, state, style, transition, trigger} from "@angular/animations";

export const flyInOut =
  trigger('flyInOut', [
  state('in', style({ opacity: 1 })),
  transition('void => *', [
    style({ opacity: 0 }),
    animate(150)
  ]),
  transition('void => *', [
    style({ opacity: 1 }),
    animate(150)
  ]),
]);

export const animCloseOpen =
  trigger('slideIn', [
    state('*', style({ 'overflow-y': 'hidden' })),
    state('void', style({ 'overflow-y': 'hidden' })),
    transition('* => void', [
      style({ height: '*' }),
      animate(150, style({ height: 0 }))
    ]),
    transition('void => *', [
      style({ height: '0' }),
      animate(150, style({ height: '*' }))
    ])
  ])
