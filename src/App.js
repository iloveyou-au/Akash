import React, { useState, useEffect } from 'react';
import { Heart, Send, ArrowLeft, Smile, Mic, Phone, Video, Info, Sparkles } from 'lucide-react';

export default function RomanticInstagram() {
  const [showHearts, setShowHearts] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  
  const storyImage = '/story.jpeg';

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageCount(prev => (prev < 15 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const createFloatingHeart = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 2000);
  };

  const messages = [
    { type: 'date', text: '17-09-2024' },
    { type: 'story' },
    { type: 'reply-label' },
    { sender: 'you', text: "👀nice", time: '12m ago' },
    { sender: 'them', text: "Who is this??", time: '11m ago' },
    { sender: 'you', text: "enna theriyatha", time: '10m ago' },
    { sender: 'them', text: "therila", time: '9m ago' },
    { sender: 'you', text: "Janani soliya", time: '8m ago' },
    { sender: 'them', text: "oo Akask", time: '7m ago' },
  ];

  return (
    <div style={styles.container}>
      {showHearts && (
        <div style={styles.heartsContainer}>
          {[...Array(12)].map((_, i) => (
            <Heart
              key={i}
              size={Math.random() * 30 + 20}
              fill="#ff1744"
              color="#ff1744"
              style={{
                ...styles.floatingHeart,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div style={styles.messagesPanel}>
        <div style={styles.messagesPanelHeader}>
          <ArrowLeft size={26} style={{cursor: 'pointer'}} />
          <div style={styles.messagesPanelUser}>
            <div style={styles.messagePanelAvatar}>
              <Sparkles size={20} color="white" />
            </div>
            <div style={{flex: 1}}>
              <div style={styles.messagePanelUsername}>my_love 💖</div>
              <div style={styles.messagePanelStatus}>Active now</div>
            </div>
          </div>
          <div style={styles.headerIcons}>
            <Phone size={22} style={{cursor: 'pointer'}} onClick={createFloatingHeart} />
            <Video size={24} style={{cursor: 'pointer'}} onClick={createFloatingHeart} />
            <Info size={24} style={{cursor: 'pointer'}} />
          </div>
        </div>

        <div style={styles.messagesContent}>
          {messages.slice(0, messageCount).map((msg, index) => {
            if (msg.type === 'date') {
              return (
                <div key={index} style={styles.dateLabel}>
                  {msg.text}
                </div>
              );
            }

            if (msg.type === 'story') {
              return (
                <div key={index} style={styles.storyMessageContainer}>
                  <div style={styles.messageAvatar}>
                    <Sparkles size={16} color="white" />
                  </div>
                  <div style={styles.storyMessageCard}>
                    <div style={styles.storyCardHeader}>
                      <div style={styles.storyCardUser}>
                        <div style={styles.storyCardAvatar}>
                          <Sparkles size={12} color="white" />
                        </div>
                        <span style={styles.storyCardUsername}>my_love</span>
                        <span style={styles.storyCardTime}>5h</span>
                      </div>
                    </div>
                    <div style={styles.storyCardImage}>
                      <img 
                        src={storyImage} 
                        alt="Story" 
                        style={styles.storyImage}
                      />
                      <div style={styles.storyCaption}>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (msg.type === 'reply-label') {
              return (
                <div key={index} style={styles.replyToStoryLabel}>
                  <div style={styles.replyLine}></div>
                  <span style={styles.replyText}>Replied to story</span>
                  <div style={styles.replyLine}></div>
                </div>
              );
            }

            return (
              <div
                key={index}
                style={{
                  ...styles.messageRow,
                  justifyContent: msg.sender === 'you' ? 'flex-end' : 'flex-start'
                }}
                className="message-bubble"
              >
                {msg.sender === 'them' && (
                  <div style={styles.messageAvatar}>
                    <Sparkles size={16} color="white" />
                  </div>
                )}
                <div style={styles.messageBubbleWrapper}>
                  <div
                    style={{
                      ...styles.messageBubble,
                      ...(msg.sender === 'you' ? styles.messageBubbleYou : styles.messageBubbleThem)
                    }}
                  >
                    {msg.text}
                  </div>
                  <div style={{...styles.messageTime, textAlign: msg.sender === 'you' ? 'right' : 'left'}}>
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}

          {messageCount >= messages.length && (
            <div style={styles.typingIndicator}>
              <div style={styles.messageAvatar}>
                <Sparkles size={16} color="white" />
              </div>
              <div style={styles.typingBubble}>
                <div style={styles.typingDot}></div>
                <div style={{...styles.typingDot, animationDelay: '0.2s'}}></div>
                <div style={{...styles.typingDot, animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}
        </div>

        <div style={styles.messageInputContainer}>
          <div style={styles.messageInputWrapper}>
            <Smile size={24} color="#999" style={{cursor: 'pointer'}} />
            <input 
              type="text" 
              placeholder="Type your heart out..." 
              style={styles.messageInput}
            />
            <Mic size={24} color="#999" style={{cursor: 'pointer'}} />
            <Heart 
              size={24} 
              color="#ff1744" 
              fill="#ff1744"
              style={{cursor: 'pointer'}}
              onClick={createFloatingHeart}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        @keyframes floatHeart {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .message-bubble {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #fd1d1d 50%, #833ab4 75%, #c13584 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 15s ease infinite',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },

  heartsContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1000,
  },

  floatingHeart: {
    position: 'absolute',
    bottom: '-50px',
    animation: 'floatHeart 4s ease-in forwards',
  },
  
  messagesPanel: {
    width: '420px',
    height: '820px',
    background: 'white',
    borderRadius: '45px',
    overflow: 'hidden',
    boxShadow: '0 50px 120px rgba(255,23,68,0.6), 0 0 0 14px rgba(255,255,255,0.3), 0 0 0 16px rgba(255,255,255,0.2)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,
  },
  
  messagesPanelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 24px',
    borderBottom: '1px solid #dbdbdb',
    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)',
  },
  
  messagesPanelUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flex: 1,
    marginLeft: '14px',
  },
  
  messagePanelAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    boxShadow: '0 4px 12px rgba(245, 87, 108, 0.4)',
  },
  
  messagePanelUsername: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#262626',
  },
  
  messagePanelStatus: {
    fontSize: '13px',
    color: '#8e8e8e',
    marginTop: '2px',
  },
  
  headerIcons: {
    display: 'flex',
    gap: '22px',
    color: '#262626',
  },
  
  messagesContent: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,245,250,1) 100%)',
  },
  
  dateLabel: {
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: '600',
    color: '#8e8e8e',
    marginBottom: '12px',
    marginTop: '8px',
  },
  
  storyMessageContainer: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
    animation: 'slideUp 0.5s ease-out',
    marginBottom: '4px',
  },
  
  storyMessageCard: {
    maxWidth: '280px',
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '2px solid transparent',
    backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #f093fb, #f5576c)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    boxShadow: '0 8px 24px rgba(245, 87, 108, 0.2)',
  },
  
  storyCardHeader: {
    padding: '12px 14px',
    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)',
    borderBottom: '1px solid rgba(245, 87, 108, 0.2)',
  },
  
  storyCardUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  
  storyCardAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    border: '1.5px solid white',
  },
  
  storyCardUsername: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#262626',
  },
  
  storyCardTime: {
    fontSize: '12px',
    color: '#8e8e8e',
    marginLeft: 'auto',
  },
  
  storyCardImage: {
    position: 'relative',
    width: '100%',
    height: '380px',
    background: '#000',
  },
  
  storyImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  
  storyCaption: {
    position: 'absolute',
    bottom: '12px',
    left: '12px',
    right: '12px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    textShadow: '0 2px 8px rgba(0,0,0,0.8)',
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(12px)',
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  
  replyToStoryLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '8px 0',
  },
  
  replyLine: {
    flex: 1,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(245, 87, 108, 0.3), transparent)',
  },
  
  replyText: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#f5576c',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  
  messageRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-end',
  },
  
  messageAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: 0,
    boxShadow: '0 4px 12px rgba(245, 87, 108, 0.3)',
  },
  
  messageBubbleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    maxWidth: '75%',
  },
  
  messageBubble: {
    padding: '12px 18px',
    borderRadius: '22px',
    fontSize: '15px',
    lineHeight: '1.6',
    wordWrap: 'break-word',
  },
  
  messageBubbleThem: {
    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.15) 0%, rgba(245, 87, 108, 0.15) 100%)',
    color: '#262626',
    borderBottomLeftRadius: '4px',
    border: '1px solid rgba(245, 87, 108, 0.2)',
  },
  
  messageBubbleYou: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    borderBottomRightRadius: '4px',
    boxShadow: '0 4px 12px rgba(245, 87, 108, 0.3)',
  },
  
  messageTime: {
    fontSize: '11px',
    color: '#8e8e8e',
    paddingLeft: '6px',
    paddingRight: '6px',
    fontWeight: '500',
  },
  
  typingIndicator: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-end',
    animation: 'slideUp 0.3s ease-out',
  },
  
  typingBubble: {
    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.15) 0%, rgba(245, 87, 108, 0.15) 100%)',
    padding: '14px 20px',
    borderRadius: '22px',
    borderBottomLeftRadius: '4px',
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    border: '1px solid rgba(245, 87, 108, 0.2)',
  },
  
  typingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#f5576c',
    animation: 'typing 1.4s ease-in-out infinite',
  },
  
  messageInputContainer: {
    padding: '14px 24px 20px',
    borderTop: '1px solid rgba(245, 87, 108, 0.2)',
    background: 'linear-gradient(to top, rgba(255,245,250,1) 0%, rgba(255,255,255,1) 100%)',
  },
  
  messageInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '12px 18px',
    border: '2px solid transparent',
    backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(240, 147, 251, 0.5), rgba(245, 87, 108, 0.5))',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    borderRadius: '26px',
    boxShadow: '0 4px 12px rgba(245, 87, 108, 0.15)',
  },
  
  messageInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    color: '#262626',
    background: 'transparent',
  },
};