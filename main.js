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
 
  let xhr = XMLHttpRequest.prototype;
  let open = xhr.open;
  xhr.open = function (a, b, c) {
    b != "https://note.com/api/v3/trackings/fp" &&
    b != "https://note.com/api/v2/stats/reading_rate" &&
    b != "https://note.com/api/v2/stats/read_history" &&
      open.call(this, a, b, c);
  }
  let send = xhr.send;
  xhr.send = function (a) {
    this.readyState && send.call(this, a)
  }
}