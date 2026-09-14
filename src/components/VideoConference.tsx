import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  Phone,
  PhoneOff,
  MessageSquare,
  Users,
  Hand,
  HandMetal,
  Smile,
  Settings,
  MoreHorizontal,
  Send,
  X,
  Maximize2,
  Minimize2,
  PenTool,
  LayoutGrid,
  Grid3x3,
  Pin,
  PinOff,
  Volume2,
  VolumeX,
  ChevronDown,
  Clock,
  Wifi,
  WifiOff,
  Copy,
  Link2,
  Shield,
  UserPlus,
  BookOpen,
  StickyNote,
  PanelLeftClose,
  PanelLeftOpen,
  Circle,
  Square,
  Pause,
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isHandRaised: boolean;
  isSpeaking: boolean;
  isHost: boolean;
  isPinned: boolean;
  connectionQuality: 'good' | 'medium' | 'poor';
}

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  time: string;
  isPrivate: boolean;
}

const mockParticipants: Participant[] = [
  { id: '1', name: 'Sarah Thompson (You)', avatar: '👩‍🏫', isMuted: false, isVideoOn: true, isHandRaised: false, isSpeaking: true, isHost: true, isPinned: false, connectionQuality: 'good' },
  { id: '2', name: 'Maria García', avatar: '👩‍🎓', isMuted: true, isVideoOn: true, isHandRaised: false, isSpeaking: false, isHost: false, isPinned: false, connectionQuality: 'good' },
  { id: '3', name: 'Li Wei', avatar: '👨‍🎓', isMuted: true, isVideoOn: true, isHandRaised: true, isSpeaking: false, isHost: false, isPinned: false, connectionQuality: 'good' },
  { id: '4', name: 'Ahmed Hassan', avatar: '👨‍💼', isMuted: false, isVideoOn: true, isHandRaised: false, isSpeaking: false, isHost: false, isPinned: false, connectionQuality: 'medium' },
  { id: '5', name: 'Yuki Tanaka', avatar: '👩‍💻', isMuted: true, isVideoOn: false, isHandRaised: false, isSpeaking: false, isHost: false, isPinned: false, connectionQuality: 'good' },
  { id: '6', name: 'Pierre Dubois', avatar: '👨‍🏫', isMuted: true, isVideoOn: true, isHandRaised: false, isSpeaking: false, isHost: false, isPinned: false, connectionQuality: 'good' },
];

const mockMessages: ChatMessage[] = [
  { id: '1', sender: 'Sarah Thompson', avatar: '👩‍🏫', message: 'Welcome everyone! Today we\'re practicing conversation skills.', time: '09:00', isPrivate: false },
  { id: '2', sender: 'Maria García', avatar: '👩‍🎓', message: 'Thank you! I\'m ready 😊', time: '09:01', isPrivate: false },
  { id: '3', sender: 'Li Wei', avatar: '👨‍🎓', message: 'Can we also review the homework from last class?', time: '09:02', isPrivate: false },
  { id: '4', sender: 'Sarah Thompson', avatar: '👩‍🏫', message: 'Of course! We\'ll go over it after the warm-up activity.', time: '09:02', isPrivate: false },
  { id: '5', sender: 'Ahmed Hassan', avatar: '👨‍💼', message: 'I have a question about the reading assignment', time: '09:05', isPrivate: false },
  { id: '6', sender: 'Yuki Tanaka', avatar: '👩‍💻', message: 'The audio is a bit unclear, sorry!', time: '09:06', isPrivate: false },
  { id: '7', sender: 'Sarah Thompson', avatar: '👩‍🏫', message: 'No problem Yuki! I\'ll speak a bit louder.', time: '09:06', isPrivate: false },
];

const VideoConference: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'spotlight'>('grid');
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [participants] = useState<Participant[]>(mockParticipants);
  const [showControls, setShowControls] = useState(true);
  const [classDuration, setClassDuration] = useState(0);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [chatSendTo, setChatSendTo] = useState('Everyone');
  const [showReactions, setShowReactions] = useState(false);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setClassDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    const newMsg: ChatMessage = {
      id: String(messages.length + 1),
      sender: 'Sarah Thompson',
      avatar: '👩‍🏫',
      message: chatMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      isPrivate: chatSendTo !== 'Everyone',
    };
    setMessages([...messages, newMsg]);
    setChatMessage('');
  };

  const sendReaction = (emoji: string) => {
    setActiveReaction(emoji);
    setShowReactions(false);
    setTimeout(() => setActiveReaction(null), 3000);
  };

  const getGridCols = () => {
    const count = participants.length;
    if (count <= 1) return 'grid-cols-1';
    if (count <= 2) return 'grid-cols-2';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-3';
    return 'grid-cols-3';
  };

  const getConnectionIcon = (quality: string) => {
    switch (quality) {
      case 'good': return <Wifi size={12} className="text-green-400" />;
      case 'medium': return <Wifi size={12} className="text-yellow-400" />;
      case 'poor': return <WifiOff size={12} className="text-red-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Class Header */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
              <span className="text-sm font-medium text-gray-700">Live Class</span>
            </div>
            <div className="h-5 w-px bg-gray-200" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">Intermediate Conversation Practice</h2>
              <p className="text-xs text-gray-500">Topic: Travel & Tourism • Level: Intermediate</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
              <Clock size={14} className="text-gray-500" />
              <span className="text-sm font-mono font-medium text-gray-700">{formatTime(classDuration)}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
              <Users size={14} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{participants.length} participants</span>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
            >
              <UserPlus size={14} /> Invite
            </button>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex gap-4">
        {/* Video Grid / Content */}
        <div className={`flex-1 bg-gray-900 rounded-2xl overflow-hidden relative ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
          {/* Reaction Overlay */}
          {activeReaction && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce z-30 pointer-events-none">
              {activeReaction}
            </div>
          )}

          {showWhiteboard ? (
            /* Whiteboard View */
            <div className="w-full h-full min-h-[500px] bg-white flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <PenTool size={16} className="text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">Interactive Whiteboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 hover:bg-gray-200 rounded-lg"><PenTool size={14} className="text-gray-600" /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded-lg"><Circle size={14} className="text-gray-600" /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded-lg"><Square size={14} className="text-gray-600" /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded-lg"><StickyNote size={14} className="text-gray-600" /></button>
                  <div className="w-px h-5 bg-gray-300 mx-1" />
                  <div className="flex gap-1">
                    {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-black'].map((color) => (
                      <button key={color} className={`w-5 h-5 rounded-full ${color} border-2 border-white shadow-sm`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-1 relative bg-white">
                {/* Whiteboard Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Travel & Tourism Vocabulary</h3>
                    <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto text-left">
                      <div>
                        <h4 className="font-semibold text-indigo-600 mb-2">🏨 Accommodation</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• <strong>reservation</strong> - booking a room</li>
                          <li>• <strong>check-in</strong> - arriving at hotel</li>
                          <li>• <strong>check-out</strong> - leaving hotel</li>
                          <li>• <strong>amenities</strong> - hotel facilities</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-indigo-600 mb-2">✈️ Transportation</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• <strong>departure</strong> - leaving</li>
                          <li>• <strong>arrival</strong> - reaching destination</li>
                          <li>• <strong>boarding pass</strong> - flight ticket</li>
                          <li>• <strong>itinerary</strong> - travel plan</li>
                        </ul>
                      </div>
                    </div>
                    <p className="mt-6 text-sm text-gray-400">✏️ Use the toolbar above to draw and annotate</p>
                  </div>
                </div>
              </div>
            </div>
          ) : isScreenSharing ? (
            /* Screen Sharing View */
            <div className="w-full h-full min-h-[500px] bg-gray-800 flex flex-col">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-600">
                <Monitor size={14} className="text-white" />
                <span className="text-sm font-medium text-white">You are sharing your screen</span>
                <button onClick={() => setIsScreenSharing(false)} className="ml-auto text-xs bg-white/20 text-white px-2 py-1 rounded hover:bg-white/30">
                  Stop Sharing
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center bg-gray-900">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Monitor size={40} className="text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-sm">Screen sharing active</p>
                  <p className="text-gray-500 text-xs mt-1">Students can see your screen</p>
                </div>
              </div>
              {/* Small self-view */}
              <div className="absolute bottom-20 right-4 w-40 h-28 bg-gray-700 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
                  <span className="text-3xl">👩‍🏫</span>
                </div>
                <div className="absolute bottom-1 left-1 text-[10px] text-white bg-black/50 px-1.5 py-0.5 rounded">You</div>
              </div>
            </div>
          ) : layout === 'grid' ? (
            /* Grid View */
            <div className={`grid ${getGridCols()} gap-2 p-3 h-full min-h-[500px] auto-rows-fr`}>
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className={`relative rounded-xl overflow-hidden group ${
                    participant.isSpeaking ? 'ring-2 ring-green-400' : ''
                  }`}
                >
                  <div className={`w-full h-full min-h-[140px] flex items-center justify-center ${
                    participant.isVideoOn
                      ? 'bg-gradient-to-br from-indigo-900/80 to-purple-900/80'
                      : 'bg-gray-800'
                  }`}>
                    {participant.isVideoOn ? (
                      <span className="text-5xl">{participant.avatar}</span>
                    ) : (
                      <div className="text-center">
                        <span className="text-4xl">{participant.avatar}</span>
                        <p className="text-xs text-gray-400 mt-2">Camera off</p>
                      </div>
                    )}
                  </div>
                  {/* Participant Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-white font-medium truncate max-w-[120px]">
                          {participant.id === '1' ? 'You' : participant.name.split(' ')[0]}
                        </span>
                        {participant.isHost && (
                          <span className="text-[9px] bg-indigo-500 text-white px-1 py-0.5 rounded">Host</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {participant.isHandRaised && <Hand size={12} className="text-yellow-400" />}
                        {participant.isMuted ? (
                          <MicOff size={12} className="text-red-400" />
                        ) : (
                          getConnectionIcon(participant.connectionQuality)
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Hover Controls */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button className="p-1 bg-black/50 rounded-lg hover:bg-black/70">
                      <Pin size={12} className="text-white" />
                    </button>
                    <button className="p-1 bg-black/50 rounded-lg hover:bg-black/70">
                      <MoreHorizontal size={12} className="text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Spotlight View */
            <div className="h-full min-h-[500px] flex flex-col p-3">
              <div className="flex-1 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-900/80 to-purple-900/80 flex items-center justify-center relative">
                <span className="text-7xl">👩‍🎓</span>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white font-medium">Maria García</p>
                  <p className="text-xs text-gray-300">Presenting</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                {participants.slice(1).map((p) => (
                  <div key={p.id} className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-indigo-900/60 to-purple-900/60 flex items-center justify-center relative">
                    <span className="text-xl">{p.avatar}</span>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-1 py-0.5">
                      <p className="text-[9px] text-white truncate">{p.name.split(' ')[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Controls Overlay */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12 pb-4 px-4 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {/* Mic */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition-all ${
                  isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff size={18} className="text-white" /> : <Mic size={18} className="text-white" />}
              </button>

              {/* Camera */}
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-full transition-all ${
                  !isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                }`}
                title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
              >
                {isVideoOn ? <Video size={18} className="text-white" /> : <VideoOff size={18} className="text-white" />}
              </button>

              {/* Screen Share */}
              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-3 rounded-full transition-all ${
                  isScreenSharing ? 'bg-green-500 hover:bg-green-600' : 'bg-white/20 hover:bg-white/30'
                }`}
                title="Share screen"
              >
                {isScreenSharing ? <MonitorOff size={18} className="text-white" /> : <Monitor size={18} className="text-white" />}
              </button>

              {/* Whiteboard */}
              <button
                onClick={() => setShowWhiteboard(!showWhiteboard)}
                className={`p-3 rounded-full transition-all ${
                  showWhiteboard ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/20 hover:bg-white/30'
                }`}
                title="Whiteboard"
              >
                <PenTool size={18} className="text-white" />
              </button>

              <div className="w-px h-8 bg-white/20 mx-1" />

              {/* Hand Raise */}
              <button
                onClick={() => setIsHandRaised(!isHandRaised)}
                className={`p-3 rounded-full transition-all ${
                  isHandRaised ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/20 hover:bg-white/30'
                }`}
                title="Raise hand"
              >
                <Hand size={18} className="text-white" />
              </button>

              {/* Reactions */}
              <div className="relative">
                <button
                  onClick={() => setShowReactions(!showReactions)}
                  className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all"
                  title="Reactions"
                >
                  <Smile size={18} className="text-white" />
                </button>
                {showReactions && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 rounded-xl p-2 flex gap-1 shadow-xl">
                    {['👍', '👏', '❤️', '😂', '😮', '🎉'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => sendReaction(emoji)}
                        className="text-xl hover:scale-125 transition-transform p-1"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Record */}
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-3 rounded-full transition-all ${
                  isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-white/20 hover:bg-white/30'
                }`}
                title={isRecording ? 'Stop recording' : 'Start recording'}
              >
                {isRecording ? <Pause size={18} className="text-white" /> : <Circle size={18} className="text-white fill-white" />}
              </button>

              <div className="w-px h-8 bg-white/20 mx-1" />

              {/* Layout Toggle */}
              <button
                onClick={() => setLayout(layout === 'grid' ? 'spotlight' : 'grid')}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all"
                title="Toggle layout"
              >
                {layout === 'grid' ? <LayoutGrid size={18} className="text-white" /> : <Grid3x3 size={18} className="text-white" />}
              </button>

              {/* Chat Toggle */}
              <button
                onClick={() => { setShowChat(!showChat); setShowParticipants(false); }}
                className={`p-3 rounded-full transition-all relative ${
                  showChat ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/20 hover:bg-white/30'
                }`}
                title="Chat"
              >
                <MessageSquare size={18} className="text-white" />
                {messages.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center">
                    {messages.length}
                  </span>
                )}
              </button>

              {/* Participants Toggle */}
              <button
                onClick={() => { setShowParticipants(!showParticipants); setShowChat(false); }}
                className={`p-3 rounded-full transition-all ${
                  showParticipants ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/20 hover:bg-white/30'
                }`}
                title="Participants"
              >
                <Users size={18} className="text-white" />
              </button>

              {/* More */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all"
                  title="More options"
                >
                  <MoreHorizontal size={18} className="text-white" />
                </button>
                {showMoreMenu && (
                  <div className="absolute bottom-full mb-2 right-0 bg-gray-800 rounded-xl py-2 w-48 shadow-xl">
                    <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-2">
                      <Settings size={14} /> Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-2">
                      <BookOpen size={14} /> Breakout Rooms
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-2">
                      <Shield size={14} /> Security
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-2">
                      <StickyNote size={14} /> Class Notes
                    </button>
                    <hr className="my-1 border-white/10" />
                    <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-2">
                      <Maximize2 size={14} /> Fullscreen
                    </button>
                  </div>
                )}
              </div>

              <div className="w-px h-8 bg-white/20 mx-1" />

              {/* End Call */}
              <button className="p-3 px-5 rounded-full bg-red-500 hover:bg-red-600 transition-all">
                <PhoneOff size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-3 right-3 p-2 bg-black/30 rounded-lg hover:bg-black/50 transition-all"
          >
            {isFullscreen ? <Minimize2 size={16} className="text-white" /> : <Maximize2 size={16} className="text-white" />}
          </button>
        </div>

        {/* Side Panel */}
        {(showChat || showParticipants) && (
          <div className="w-80 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">
                {showChat ? 'Class Chat' : `Participants (${participants.length})`}
              </h3>
              <button
                onClick={() => { setShowChat(false); setShowParticipants(false); }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={16} className="text-gray-400" />
              </button>
            </div>

            {showChat ? (
              /* Chat Panel */
              <>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[450px]">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-2 ${msg.sender === 'Sarah Thompson' ? 'flex-row-reverse' : ''}`}>
                      <div className="text-xl flex-shrink-0">{msg.avatar}</div>
                      <div className={`max-w-[80%] ${msg.sender === 'Sarah Thompson' ? 'text-right' : ''}`}>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-xs font-medium ${msg.sender === 'Sarah Thompson' ? 'text-indigo-600' : 'text-gray-700'}`}>
                            {msg.sender === 'Sarah Thompson' ? 'You' : msg.sender.split(' ')[0]}
                          </span>
                          <span className="text-[10px] text-gray-400">{msg.time}</span>
                        </div>
                        <div className={`inline-block px-3 py-2 rounded-xl text-sm ${
                          msg.sender === 'Sarah Thompson'
                            ? 'bg-indigo-600 text-white rounded-tr-sm'
                            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                        }`}>
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500">To:</span>
                    <select
                      value={chatSendTo}
                      onChange={(e) => setChatSendTo(e.target.value)}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option>Everyone</option>
                      {participants.filter(p => p.id !== '1').map(p => (
                        <option key={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Participants Panel */
              <div className="flex-1 overflow-y-auto p-3 space-y-1 max-h-[520px]">
                {/* Host Section */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-2">Host</p>
                  {participants.filter(p => p.isHost).map((p) => (
                    <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                      <span className="text-xl">{p.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {p.isHandRaised && <Hand size={14} className="text-yellow-500" />}
                        {p.isMuted ? <MicOff size={14} className="text-red-400" /> : <Mic size={14} className="text-green-400" />}
                        {p.isVideoOn ? <Video size={14} className="text-green-400" /> : <VideoOff size={14} className="text-red-400" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Students Section */}
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-2">
                    Students ({participants.filter(p => !p.isHost).length})
                  </p>
                  {participants.filter(p => !p.isHost).map((p) => (
                    <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors group">
                      <span className="text-xl">{p.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                        <div className="flex items-center gap-1">
                          {getConnectionIcon(p.connectionQuality)}
                          {p.isHandRaised && <span className="text-[10px] text-yellow-600 font-medium">✋ Hand raised</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:bg-gray-200 rounded" title="Mute">
                          {p.isMuted ? <MicOff size={12} className="text-red-400" /> : <Mic size={12} className="text-gray-400" />}
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded" title="More">
                          <MoreHorizontal size={12} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mute All Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="w-full px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    🔇 Mute All Participants
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Class Info Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Today's Lesson</p>
              <p className="text-xs text-gray-500">Travel & Tourism Vocabulary</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Hand size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Hands Raised</p>
              <p className="text-xs text-gray-500">{participants.filter(p => p.isHandRaised).length} student(s) waiting</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Chat Messages</p>
              <p className="text-xs text-gray-500">{messages.length} messages in this session</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowInviteModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Invite to Class</h2>
              <button onClick={() => setShowInviteModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Meeting Link</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    readOnly
                    value="https://eslhub.com/class/x7k9m2p"
                    className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600"
                  />
                  <button className="px-3 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                    <Copy size={16} />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Meeting ID</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 font-mono">847 293 561</span>
                  <button className="px-3 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Copy size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Send invite via email</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="email"
                    placeholder="student@email.com"
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium">
                    Send
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                <Shield size={16} className="text-yellow-600" />
                <span className="text-xs text-yellow-700">Waiting room is enabled. You must admit each participant.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoConference;
