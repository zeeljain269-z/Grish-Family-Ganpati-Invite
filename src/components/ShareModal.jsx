import { useState } from "react";
import { Share2, Copy, Check, ExternalLink, X, Download } from "lucide-react";

export function ShareModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // The public URL to share
  const isAistudioDev = typeof window !== "undefined" && window.location.hostname.includes("ais-dev");
  const publicOrigin = "https://ais-pre-heeprbr3gmc5t2agjuk7kv-287950853353.asia-southeast1.run.app";
  const currentUrl = typeof window !== "undefined" ? window.location.href : publicOrigin;
  const shareUrl = isAistudioDev ? publicOrigin : currentUrl;

  const shareText = `🚩 *श्री गणेशाय नमः* 🚩\n\n*Grish Family warmly invites you to Ganpati Utsav 2026!*\n\n🗓️ 14th & 15th September\n📍 Girish Nivas, Borivali East, Mumbai\n\nTap the link below to open your interactive invitation:\n${shareUrl}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement("input");
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Grish Family - Ganpati Invitation",
          text: "Grish Family warmly invites you to Ganpati Utsav (14th & 15th September)",
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  return (
    <div
      className="share-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-title"
    >
      <div className="share-modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="share-modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <h3 id="share-title" className="share-modal-title">
          निमंत्रण शेअर करा • Share Invitation
        </h3>
        <p className="share-modal-subtitle">
          Here is how your invitation card will appear when shared on WhatsApp & social media:
        </p>

        {/* Live Social Share Card Preview */}
        <div className="social-preview-card">
          <div className="social-preview-image-wrap">
            <img
              src="/assets/og-preview.jpg"
              alt="Invitation Preview Card"
              className="social-preview-image"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="social-preview-body">
            <span className="social-preview-domain">ais-pre-heeprbr3gmc5t2agjuk7kv-287950853353.asia-southeast1.run.app</span>
            <h4 className="social-preview-title">Grish Family - Ganpati Invitation</h4>
            <p className="social-preview-desc">
              Girish Nivas — Cordial invitation to Ganpati Darshan &amp; Pooja by Grish Family (14th &amp; 15th September).
            </p>
          </div>
        </div>

        {isAistudioDev && (
          <div className="share-modal-tip">
            <strong>Important for WhatsApp Preview:</strong>
            <p>
              Private development links cannot generate social previews because bots are blocked by login checks. To enable link previews for friends & family, click the <strong>&quot;Share&quot;</strong> button in the top toolbar of Google AI Studio to publish your shared link.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="share-modal-actions">
          <button
            type="button"
            className="share-btn share-btn-whatsapp"
            onClick={handleWhatsApp}
          >
            <span>Share via WhatsApp</span>
          </button>

          {typeof navigator !== "undefined" && navigator.share && (
            <button
              type="button"
              className="share-btn share-btn-native"
              onClick={handleNativeShare}
            >
              <Share2 size={16} />
              <span>More Options</span>
            </button>
          )}

          <button
            type="button"
            className="share-btn share-btn-copy"
            onClick={handleCopy}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? "Link Copied!" : "Copy Link"}</span>
          </button>

          <a
            href="/assets/og-preview-phone.jpg"
            download="Ganpati-Invitation-Card.jpg"
            className="share-btn share-btn-download"
            title="Download Card for WhatsApp Status or Direct Send"
          >
            <Download size={16} />
            <span>Download Card</span>
          </a>
        </div>
      </div>
    </div>
  );
}
