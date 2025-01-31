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
      case "src":
        b.slice(-3) == "600" && (b = b.slice(0, -3) + "200")
      default:
        setAttr.call(this, a, b);
    }
  }
}