{
  let o = Object;
  o.freeze = a => a;
  o.isFrozen = () => 1;
  Math.random = () => 0;

  let fet = fetch;
  let dummyThen = {
    then: ()=> dummyThen,
    catch: () => dummyThen
  };
  fetch = (a, b) =>
    a != "https://note.com/api/v3/trackings/fp" &&
    a != "https://logcollector.note.com/log_tracking_pb.firehose" ?
      fet(a, b) : dummyThen;
 
  let p = XMLHttpRequest.prototype;
  let open = p.open;
  p.open = function (a, b, c) {
    b != "https://note.com/api/v3/trackings/fp" &&
    b != "https://note.com/api/v2/stats/reading_rate" &&
    b != "https://note.com/api/v2/stats/read_history" &&
    b != "https://note.com/api/v3/points/campaigns/status" &&
      open.call(this, a, b, c);
  }
  let send = p.send;
  p.send = function (a) {
    this.readyState && send.call(this, a)
  }
  let blockElement;
  let setAttr = (p = Element.prototype).setAttribute;
  p.setAttribute = function (a, b) {
    switch (a) {
      case "alt":
      case "aria-activedescendant":
      case "aria-controls":
      case "aria-disabled":
      case "aria-expanded":
      case "aria-haspopup":
      case "aria-hidden":
      case "aria-label":
      case "aria-labelledby":
      case "aria-activedescendant":
      case "aria-pressed":
      case "data-tooltip":
      case "decoding":
      case "loading":
      case "tabindex":
      case "title":
        break;
      case "id":
        b != "gtag-script" ? this.id = b : blockElement = this;
        break;
      case "src": {
        let end = b.slice(-9);
        end != "gnup2.png" && end != "gnup1.png"
          ? setAttr.call(this, a, end == "width=600" ? b.slice(0, -3) + "200" : b)
          : blockElement = this;
        break;
      }
      default:
        setAttr.call(this, a, b);
    }
  }
  let setter = { set: () => "" };
  o.defineProperties(HTMLLinkElement.prototype, {
    charset: setter,
    rel: setter,
    as: setter,
    href: { set: function () { blockElement = this } }
  });
  Node.prototype.appendChild = function (a) {
    return a != blockElement ? this.insertBefore(a, null) : a
  }
}