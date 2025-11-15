"use client"
import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Send, Search, Plus, MoreVertical, Smile, Paperclip,
  Users, Hash, Bell, Pin, Image as ImageIcon
} from 'lucide-react';

export default function ClubChat() {
  const [message, setMessage] = useState('');

  const channels = [
    { name: 'general', unread: 3, icon: Hash },
    { name: 'announcements', unread: 0, icon: Bell },
    { name: 'events', unread: 5, icon: Users },
    { name: 'tech-discussions', unread: 1, icon: Hash },
    { name: 'resources', unread: 0, icon: Pin },
  ];

  const messages = [
    { user: 'Alice', message: 'Hey everyone! Don\'t forget about tomorrow\'s workshop at 2 PM', time: '10:30 AM', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50' },
    { user: 'Bob', message: 'Thanks for the reminder! Will we need to bring our laptops?', time: '10:32 AM', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
    { user: 'Alice', message: 'Yes! Make sure you have VS Code installed', time: '10:35 AM', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50' },
    { user: 'Carol', message: 'Can someone share the registration link?', time: '10:40 AM', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50' },
    { user: 'David', message: 'Here you go: https://club.example.com/register', time: '10:42 AM', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50' },
  ];

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-4">
      {/* Sidebar - Channels List */}
      <Card className="w-64 p-4 border border-gray-200 flex flex-col">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">Technical Club</h3>
          <p className="text-sm text-gray-500">45 members</p>
        </div>

        <div className="mb-4">
          <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Channel
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Channels</p>
            <div className="space-y-1">
              {channels.map((channel, idx) => (
                <button
                  key={idx}
                  className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                    idx === 0 ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <channel.icon className="w-4 h-4" />
                    <span className="text-sm">{channel.name}</span>
                  </div>
                  {channel.unread > 0 && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {channel.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Direct Messages</p>
            <div className="space-y-1">
              {['Alice', 'Bob', 'Carol'].map((name, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                    {name[0]}
                  </div>
                  <span className="text-sm">{name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 border border-gray-200 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Hash className="w-5 h-5 text-gray-600" />
            <div>
              <h3 className="font-semibold text-gray-900">general</h3>
              <p className="text-sm text-gray-500">Main discussion channel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Users className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Pinned Message */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
            <Pin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-900">Pinned Message</p>
              <p className="text-sm text-amber-800">Welcome to Technical Club! Check out #announcements for upcoming events.</p>
            </div>
          </div>

          {/* Regular Messages */}
          {messages.map((msg, idx) => (
            <div key={idx} className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-lg -mx-2 transition-colors">
              <img
                src={msg.avatar}
                alt={msg.user}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{msg.user}</span>
                  <span className="text-xs text-gray-500">{msg.time}</span>
                </div>
                <p className="text-gray-700 break-words">{msg.message}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-500 italic">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span>Eve is typing...</span>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Plus className="w-5 h-5" />
            </Button>
            <div className="flex-1 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    setMessage('');
                  }
                }}
              />
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-auto p-1">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="sm" className="h-auto p-1">
                  <ImageIcon className="w-4 h-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="sm" className="h-auto p-1">
                  <Smile className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            </div>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </Card>

      {/* Members Sidebar */}
      <Card className="w-64 p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Members (45)</h3>
        
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Online (8)</p>
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + idx}?w=50&h=50&fit=crop`}
                    alt="Member"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Member {idx + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Offline (37)</p>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + idx + 10}?w=50&h=50&fit=crop`}
                    alt="Member"
                    className="w-8 h-8 rounded-full object-cover opacity-60"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 truncate">Member {idx + 9}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
