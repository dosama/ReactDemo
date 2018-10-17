/* tslint:disable */
export interface ImodalProps {
  // booleanean to control the state of the popover
  isOpen: boolean;
  autoFocus: boolean;
  // if modal should be centered vertically in viewport
  centered: boolean;
  // corresponds to bootstrap's modal sizes, ie. 'lg' or 'sm'
  size: string;
  // callback for toggling isOpen in the controlling component
  toggle: Function;
  role: string; // defaults to "dialog"
  // used to reference the ID of the title element in the modal
  labelledBy: string;
  keyboard: boolean;
  // control backdrop, see http://v4-alpha.getbootstrap.com/components/modal/#options
  backdrop: [boolean, ["static"]];
  // allows for a node/componet to exist next to the modal (outside of it). Useful for external close buttons
  // external: node,
  // called on componentDidMount
  onEnter: Function;
  // called on componentWillUnmount
  onExit: Function;
  // called when done transitioning in
  onOpened: Function;
  // called when done transitioning out
  onClosed: Function;
  className: string;
  wrapClassName: string;
  modalClassName: string;
  backdropClassName: string;
  contentClassName: string;
  // booleanean to control whether the fade transition occurs (default: true)
  fade: boolean;
  cssModule: object;
  // zIndex defaults to 1000.
  zIndex: [number, string];
}
