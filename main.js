Object.freeze = a => a;
Object.isFrozen = () => 1;
{
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
      case "aria-controls":
      case "aria-disabled":
      case "aria-expanded":
      case "aria-haspopup":
      case "aria-hidden":
      case "aria-label":
      case "aria-pressed":
      case "data-tooltip":
      case "decoding":
      case "loading":
      case "title":
        break;
      case "id":
        console.log(b);
        b != "gtag-script" ? this.id = b : blockElement = this;
        break;
      case "src":
          setAttr.call(this, a, b.endsWith("600") ? b.slice(0, -3) + "200" : b);
        break;
      default:
        setAttr.call(this, a, b);
    }
  }
  HTMLBodyElement.prototype.appendChild = a =>
    a != blockElement && a.tagName != "IFRAME" ? document.body.insertBefore(a, null) : a
}