"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  HeadphonesIcon,
  AlertCircle,
} from "lucide-react";

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    priority: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const generated = Math.floor(100000 + Math.random() * 900000);
    setTicketNumber(generated);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-8 text-center border-2 border-green-200">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl text-gray-900 mb-4">
            Ticket Submitted Successfully!
          </h2>

          <p className="text-gray-600 mb-2">
            Your support ticket has been created and assigned ticket number:
          </p>

          <p className="text-2xl text-blue-600 mb-6">#{ticketNumber}</p>

          <p className="text-sm text-gray-600 mb-8">
            Our support team will respond within 2–4 hours. You &apos;ll get an
            email at <strong>{formData.email}</strong>.
          </p>

          <Button onClick={() => setSubmitted(false)} className="w-full">
            Submit Another Ticket
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <HeadphonesIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl text-gray-900 mb-4">Contact Support</h1>
          <p className="text-lg text-gray-600">
            We're here to help! Get in touch with our support team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <Card className="p-6 border border-gray-200">
              <h3 className="text-lg text-gray-900 mb-4">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-900">Email</p>
                    <a
                      href="mailto:support@smartcurriculum.edu"
                      className="text-sm text-blue-600"
                    >
                      support@smartcurriculum.edu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-900">Phone</p>
                    <a
                      href="tel:+1-555-123-4567"
                      className="text-sm text-blue-600"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-900">Live Chat</p>
                    <button className="text-sm text-blue-600">
                      Start a conversation
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-900">Address</p>
                    <p className="text-sm text-gray-600">
                      123 Education Street
                      <br />
                      Tech Park, CA 94025 <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-gray-200">
              <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Support Hours
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mon–Fri</span>
                  <span className="text-gray-900">9 AM – 6 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-gray-900">10 AM – 4 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-900">Closed</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-900">
                  🟢 Currently Available — Avg. response time: 2 hours
                </p>
              </div>
            </Card>

            <Card className="p-6 border-2 border-blue-200 bg-blue-50">
              <AlertCircle className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg text-gray-900 mb-2">Quick Help</h3>
              <p className="text-sm text-gray-600 mb-4">
                Most questions can be answered in our FAQ section
              </p>
              <Button variant="outline" className="w-full">
                View FAQs
              </Button>
            </Card>
          </div>

          {/* RIGHT SIDE: FORM */}
          <Card className="lg:col-span-2 p-8 border border-gray-200">
            <h3 className="text-2xl text-gray-900 mb-6">
              Submit a Support Ticket
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME + EMAIL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@university.edu"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* CATEGORY & PRIORITY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: string) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account">Account & Login</SelectItem>
                      <SelectItem value="attendance">Attendance</SelectItem>
                      <SelectItem value="coursework">
                        Coursework & Assignments
                      </SelectItem>
                      <SelectItem value="grades">Grades & Evaluation</SelectItem>
                      <SelectItem value="technical">Technical Issues</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority *</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: string) =>
                      setFormData({ ...formData, priority: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* SUBJECT */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief description"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />
              </div>

              {/* MESSAGE */}
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="Explain your issue in detail..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>

              {/* WARNING BOX */}
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
                <p className="text-sm text-yellow-900">
                  For urgent issues affecting multiple users, please call our
                  hotline directly.
                  <br />
                  Response time: Low (24h) | Medium (12h) | High (4h) |
                  Critical (1h)
                </p>
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-linear-to-r from-blue-500 to-purple-600"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    <span>Submit Ticket</span>
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
