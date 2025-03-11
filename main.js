{
  let o = Object;
  o.freeze = a => a;
  o.isFrozen =
  o.hasOwnProperty = () => 1;

  // embed bluesky
  let n = 0;
  Math.random = () => n += .000000001;

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
        return 0;
      case "id":
       return b != "gtag-script" ? this.id = b : blockElement = this;
      case "src": {
        let end = b.slice(-9);
        return end != "gnup2.png" && end != "gnup1.png"
          ? setAttr.call(this, a, end == "width=600" ? b.slice(0, -3) + "200" : b)
          : blockElement = this;
      }
      default:
        setAttr.call(this, a, b);
    }
  }
  // var kkk = {};
  o.prototype.hasOwnProperty.call = (a, b) => {
    switch (b) {
      case "Accept":
      case "alt":
      case "altKey":
      case "animate":
      case "aria-controls":
      case "aria-current-value":
      case "aria-describedby":
      case "aria-disabled":
      case "aria-expanded":
      case "aria-haspopup":
      case "aria-hidden":
      case "aria-label":
      case "aria-labelledby":
      case "aria-pressed":
      case "ariaCurrentValue":
      case "ariaHidden":
      case "ariaLabel":
      case "bg-transparent":
      case "bgTransparent":
      // case "datetime":
      case "color":
      case "devicePixelRatio":
      case "disabled":
      case "draggable":
      case "imageAlt":
      case "is-hovered":
      case "is-liked":
      case "isLiked":
      case "isMobile":
      case "isHovered":
      case "label":
      case "label-font-bold":
      case "label-font-size":
      // case "label-text":
      case "labelFontBold":
      case "labelFontSize":
      case "labelText":
      case "like-animation":
      case "like-click-log-model":
      case "likeAnimation":
      case "loading":
      case "placeholder":
      case "placeholderTag":
      case "prefetch":
      case "rel":
      case "share-booster-modal":
      case "share-booster-pc":
      case "share-button-exp-group-name":
      case "share-target":
      case "share-target-type":
      case "share-tracking-contents":
      case "share-url":
      case "shareAnimationTimer":
      case "shareBoosterModal":
      case "shareBoosterPc":
      case "shareButtonExpGroupName":
      case "shareClickTrackingParam":
      case "shareMenuDesktopPosition":
      case "shareTarget":
      case "shareTargetType":
      case "shareTrackingContents":
      case "shareUrl":
      case "tabIndex":
      case "tiltX":
      case "tiltY":
      case "underline-style":
      case "underlineStyle":
      case "warning":
      case "xmlns":
      case "_Ctor":
      case "__ob__":
        return 0;
      case "no-prefetch":
      case "noPrefetch":
        return 1;
      default:
        // typeof b == "string" && b.length > 2 && (kkk[b] ? ++kkk[b] : kkk[b] = 1);
        return b in a;
    }
  }
  o.defineProperties(HTMLLinkElement.prototype, {
    charset: { set: () => "" },
    rel: { set: () => "" },
    as: { set: () => "" },
    href: { set: function () { blockElement = this } }
  });
  Node.prototype.appendChild = function (a) {
    return a != blockElement ? this.insertBefore(a, null) : a
  }
}