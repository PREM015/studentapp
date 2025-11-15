"use client"
import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { 
  Calendar, MapPin, Users, Clock, Plus, Edit, Trash2, Eye,
  Send, X, Upload, CheckCircle, XCircle, AlertCircle, Star,
  TrendingUp, Award, MessageSquare, Share2
} from 'lucide-react';

export default function ClubEventManagement() {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const events = [
    {
      id: 1,
      title: 'Hackathon 2024',
      date: 'Jun 20-21, 2024',
      time: '9:00 AM - 6:00 PM',
      venue: 'Computer Lab',
      type: 'Competition',
      registrations: 45,
      capacity: 50,
      status: 'upcoming',
      attendance: null,
      feedback: null
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      date: 'Jun 25, 2024',
      time: '2:00 PM - 5:00 PM',
      venue: 'Auditorium',
      type: 'Workshop',
      registrations: 48,
      capacity: 50,
      status: 'upcoming',
      attendance: null,
      feedback: null
    },
    {
      id: 3,
      title: 'Tech Talk: AI & ML',
      date: 'Jun 15, 2024',
      time: '3:00 PM - 5:00 PM',
      venue: 'Hall A',
      type: 'Seminar',
      registrations: 42,
      capacity: 60,
      status: 'completed',
      attendance: 38,
      feedback: 4.5
    },
  ];

  if (selectedEvent) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedEvent(null)}>
            ← Back to Events
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Event
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" />
              Cancel Event
            </Button>
          </div>
        </div>

        {/* Event Details */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedEvent.venue}</span>
                </div>
              </div>
            </div>
            <Badge className={
              selectedEvent.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
              selectedEvent.status === 'ongoing' ? 'bg-green-100 text-green-700' :
              'bg-gray-100 text-gray-700'
            }>
              {selectedEvent.status}
            </Badge>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-900">Registrations</span>
              </div>
              <p className="text-3xl font-bold text-blue-900">{selectedEvent.registrations}</p>
              <Progress value={(selectedEvent.registrations / selectedEvent.capacity) * 100} className="mt-2" />
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-purple-900">Capacity</span>
              </div>
              <p className="text-3xl font-bold text-purple-900">{selectedEvent.capacity}</p>
              <p className="text-sm text-purple-700 mt-2">
                {selectedEvent.capacity - selectedEvent.registrations} spots left
              </p>
            </div>

            {selectedEvent.attendance && (
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-900">Attendance</span>
                </div>
                <p className="text-3xl font-bold text-green-900">{selectedEvent.attendance}</p>
                <p className="text-sm text-green-700 mt-2">
                  {Math.round((selectedEvent.attendance / selectedEvent.registrations) * 100)}% turnout
                </p>
              </div>
            )}

            {selectedEvent.feedback && (
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-amber-900">Feedback</span>
                </div>
                <p className="text-3xl font-bold text-amber-900">{selectedEvent.feedback}</p>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedEvent.feedback) 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Event Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Event Description</h3>
            <p className="text-gray-700">
              Join us for an exciting {selectedEvent.type.toLowerCase()} where you'll learn cutting-edge 
              technologies and network with industry professionals. This event is designed to enhance 
              your technical skills and provide hands-on experience.
            </p>
          </div>

          {/* Schedule */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Event Schedule</h3>
            <div className="space-y-2">
              {[
                { time: '9:00 AM', activity: 'Registration & Welcome' },
                { time: '9:30 AM', activity: 'Opening Ceremony' },
                { time: '10:00 AM', activity: 'Main Session Begins' },
                { time: '1:00 PM', activity: 'Lunch Break' },
                { time: '2:00 PM', activity: 'Afternoon Session' },
                { time: '5:30 PM', activity: 'Closing & Prize Distribution' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-20 text-sm font-semibold text-gray-900">{item.time}</div>
                  <div className="flex-1 text-gray-700">{item.activity}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Registered Participants */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              Registered Participants ({selectedEvent.registrations})
            </h3>
            <div className="flex items-center gap-2">
              <Input placeholder="Search participants..." className="w-64" />
              <Button variant="outline">Export List</Button>
              {selectedEvent.status === 'upcoming' && (
                <Button className="bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send Reminder
                </Button>
              )}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Participant</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Branch</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Year</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Registered On</th>
                  {selectedEvent.status === 'completed' && (
                    <>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Attendance</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Feedback</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://images.unsplash.com/photo-${1500000000000 + idx}?w=50&h=50&fit=crop`}
                          alt="Student"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">Student {idx + 1}</p>
                          <p className="text-sm text-gray-500">CSE2022{(idx + 1).toString().padStart(3, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">Computer Science</td>
                    <td className="py-3 px-4 text-sm text-gray-600">3rd Year</td>
                    <td className="py-3 px-4 text-sm text-gray-600">Jun {10 + idx}, 2024</td>
                    {selectedEvent.status === 'completed' && (
                      <>
                        <td className="py-3 px-4">
                          <Badge className={
                            idx < 8 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }>
                            {idx < 8 ? 'Present' : 'Absent'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {idx < 8 ? (
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < 4 ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
          <p className="text-gray-500">{events.length} total events</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowCreateEvent(!showCreateEvent)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: '12', icon: Calendar, color: 'blue' },
          { label: 'Upcoming', value: '3', icon: Clock, color: 'green' },
          { label: 'Total Attendees', value: '245', icon: Users, color: 'purple' },
          { label: 'Avg Rating', value: '4.5', icon: Star, color: 'amber' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Create Event Form */}
      {showCreateEvent && (
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Create New Event</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowCreateEvent(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
              <Input placeholder="e.g., Annual Tech Fest 2024" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Workshop</option>
                  <option>Seminar</option>
                  <option>Competition</option>
                  <option>Hackathon</option>
                  <option>Cultural</option>
                  <option>Social</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity *</label>
                <Input type="number" placeholder="50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Date *</label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Time *</label>
                <Input type="time" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
              <Input placeholder="e.g., Main Auditorium" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <Textarea rows={4} placeholder="Describe the event, what participants will learn, and any prerequisites..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Banner</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload banner image</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Deadline</label>
                <Input type="date" />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">Enable registration limit</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowCreateEvent(false)}>
                Cancel
              </Button>
              <Button variant="outline" className="flex-1">
                Save as Draft
              </Button>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                Create Event
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Events List */}
      <div className="space-y-3">
        {events.map((event) => (
          <Card 
            key={event.id}
            className="p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <Badge className={
                    event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                    event.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }>
                    {event.status}
                  </Badge>
                  <Badge variant="outline">{event.type}</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Registrations</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(event.registrations / event.capacity) * 100} className="w-32" />
                      <span className="text-sm font-semibold text-gray-900">
                        {event.registrations}/{event.capacity}
                      </span>
                    </div>
                  </div>

                  {event.attendance && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Attendance</p>
                      <span className="text-sm font-semibold text-gray-900">
                        {event.attendance} ({Math.round((event.attendance / event.registrations) * 100)}%)
                      </span>
                    </div>
                  )}

                  {event.feedback && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Feedback</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold text-gray-900">{event.feedback}/5</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
