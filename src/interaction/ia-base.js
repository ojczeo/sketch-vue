
export default class IaBase {
  constructor(transform) {
    this._transform = transform;
  }

  on(callback) {
    this._callback = callback;
  }

  emit(event, payload) {
    if (this._callback) {
      this._callback(event, payload)
    }
  }

  getMouseDelta(event, otherPoint) {
    const pt = this.getScreenPoint(event);
    const xDelta = Math.abs(pt.x - otherPoint.x);
    const yDelta = Math.abs(pt.y - otherPoint.y);
    const delta = Math.max(xDelta, yDelta);
    return delta;
  }

  getScreenPoint(event) {
    return this._transform.getScreenPoint(event);
  }

  pickElement(event) {
    const pt = this.getScreenPoint(event);
    const element = document.elementFromPoint(pt.x, pt.y);
    if (!element) {
      return null;
    }
    let pickedElement = null;
    switch (element.nodeName) {
      case "text":
        pickedElement = element;
        break;
      case "tspan":
        if (element.parentNode && element.parentNode.nodeName === "text") {
          pickedElement = element.parentNode;
        }
        break;
      case "rect":
        pickedElement = element;
        break;
      case "circle":
        pickedElement = element;
        break;
      case "polygon":
        pickedElement = element;
        break;
    }
    return pickedElement;
  }

  pickItemId(event) {
    if (!event) {
      throw new Error("pickedItemId: event missing")
    }
    let pickedElement = this.pickElement(event);
    if (!pickedElement) {
      return null;
    }

    const iid = pickedElement.getAttribute("iid");
    return iid;
  }

  getSVGPoint(event) {
    let pt = this._transform.getSVGPoint(event);
    pt.x = Math.floor(pt.x);
    pt.y = Math.floor(pt.y);
    return pt;
  }
}
