import React from "react";

const SocialShare = ({ username }) => {
  const shareUrl = `${window.location.protocol}//${window.location.hostname}/sendmessage/${username}`;

  const text = `Hey 👋, Found this cool website where you can message me anonymously. I will never know who messaged me 😂.Send me anonymous feedbacks 😉`;

  return (
    <div className="social-share">
      <div>Share your Link</div>
      <div className="social-links">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://api.whatsapp.com/send?text=${text} ${shareUrl}`}
        >
          <i className="fab fa-whatsapp"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://telegram.me/share/url?url=${shareUrl}&text=${text}`}
        >
          <i className="fab fa-telegram"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`http://twitter.com/share?text=@${text}&url=${shareUrl}/&hashtags=AnonyMsg,anonymous,messaging`}
        >
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  );
};

export default SocialShare;
