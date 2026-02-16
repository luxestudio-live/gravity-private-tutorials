'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { useAuth } from '@/lib/auth-context'
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore'
import { Trash2, Mail, Phone, User, CheckCircle2, Circle, MessageSquare } from 'lucide-react'

type ContactSubmission = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  status: 'unread' | 'read'
  contacted: boolean
  submittedAt: string
  createdAt?: any
}

type FilterType = 'all' | 'unread' | 'read' | 'contacted' | 'not-contacted'

export default function ContactManagement() {
  const { user } = useAuth()
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      const fetchedContacts = snap.docs.map((d) => {
        const data = d.data()
        return {
          id: d.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          message: data.message || '',
          status: data.status || 'unread',
          contacted: data.contacted || false,
          submittedAt: data.submittedAt || '',
          createdAt: data.createdAt,
        } as ContactSubmission
      })
      console.log('Fetched contacts:', fetchedContacts)
      setContacts(fetchedContacts)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'contacts', id), {
        status: 'read',
      })
      setContacts(contacts.map((c) => (c.id === id ? { ...c, status: 'read' } : c)))
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status: 'read' })
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleMarkAsUnread = async (id: string) => {
    try {
      await updateDoc(doc(db, 'contacts', id), {
        status: 'unread',
      })
      setContacts(contacts.map((c) => (c.id === id ? { ...c, status: 'unread' } : c)))
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status: 'unread' })
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleMarkAsContacted = async (id: string) => {
    try {
      await updateDoc(doc(db, 'contacts', id), {
        contacted: true,
      })
      setContacts(contacts.map((c) => (c.id === id ? { ...c, contacted: true } : c)))
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, contacted: true })
      }
    } catch (error) {
      console.error('Error updating contact status:', error)
    }
  }

  const handleMarkAsNotContacted = async (id: string) => {
    try {
      await updateDoc(doc(db, 'contacts', id), {
        contacted: false,
      })
      setContacts(contacts.map((c) => (c.id === id ? { ...c, contacted: false } : c)))
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, contacted: false })
      }
    } catch (error) {
      console.error('Error updating contact status:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteDoc(doc(db, 'contacts', id))
        setContacts(contacts.filter((c) => c.id !== id))
        if (selectedContact?.id === id) {
          setSelectedContact(null)
        }
      } catch (error) {
        console.error('Error deleting contact:', error)
      }
    }
  }

  const getFilteredContacts = () => {
    switch (filter) {
      case 'unread':
        return contacts.filter((c) => c.status === 'unread')
      case 'read':
        return contacts.filter((c) => c.status === 'read')
      case 'contacted':
        return contacts.filter((c) => c.contacted)
      case 'not-contacted':
        return contacts.filter((c) => !c.contacted)
      default:
        return contacts
    }
  }

  const filteredContacts = getFilteredContacts()
  const stats = {
    total: contacts.length,
    unread: contacts.filter((c) => c.status === 'unread').length,
    read: contacts.filter((c) => c.status === 'read').length,
    contacted: contacts.filter((c) => c.contacted).length,
  }

  return (
    <div className="py-4 md:py-6">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Contact Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Total Contacts</p>
          <p className="text-2xl md:text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Unread</p>
          <p className="text-2xl md:text-3xl font-bold text-yellow-600">{stats.unread}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Read</p>
          <p className="text-2xl md:text-3xl font-bold text-green-600">{stats.read}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Contacted</p>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{stats.contacted}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-card border border-border hover:bg-muted'
          }`}
        >
          All ({stats.total})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'unread'
              ? 'bg-yellow-600 text-white'
              : 'bg-card border border-border hover:bg-muted'
          }`}
        >
          Unread ({stats.unread})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'read'
              ? 'bg-green-600 text-white'
              : 'bg-card border border-border hover:bg-muted'
          }`}
        >
          Read ({stats.read})
        </button>
        <button
          onClick={() => setFilter('contacted')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'contacted'
              ? 'bg-blue-600 text-white'
              : 'bg-card border border-border hover:bg-muted'
          }`}
        >
          Contacted ({stats.contacted})
        </button>
        <button
          onClick={() => setFilter('not-contacted')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'not-contacted'
              ? 'bg-purple-600 text-white'
              : 'bg-card border border-border hover:bg-muted'
          }`}
        >
          Not Contacted ({stats.total - stats.contacted})
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-20">
          <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No contacts found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {/* Contact List */}
          <div className="md:col-span-2 space-y-3 md:space-y-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedContact?.id === contact.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{contact.name}</h3>
                      {contact.status === 'unread' && (
                        <Circle className="w-3 h-3 fill-yellow-600 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {contact.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {contact.contacted && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-foreground/80 line-clamp-2">{contact.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{contact.submittedAt}</p>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          {selectedContact && (
            <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-4">
              <h2 className="text-2xl font-bold mb-4">{selectedContact.name}</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">
                    {selectedContact.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <a href={`tel:${selectedContact.phone}`} className="text-primary hover:underline">
                    {selectedContact.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Submitted</p>
                  <p>{selectedContact.submittedAt}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Message</p>
                <p className="text-foreground whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  {selectedContact.status === 'unread' ? (
                    <button
                      onClick={() => handleMarkAsRead(selectedContact.id)}
                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                    >
                      Mark as Read
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMarkAsUnread(selectedContact.id)}
                      className="flex-1 px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm"
                    >
                      Mark as Unread
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  {!selectedContact.contacted ? (
                    <button
                      onClick={() => handleMarkAsContacted(selectedContact.id)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Mark as Contacted
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMarkAsNotContacted(selectedContact.id)}
                      className="flex-1 px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
                    >
                      Mark as Not Contacted
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    handleDelete(selectedContact.id)
                  }}
                  className="w-full px-3 py-2 bg-destructive text-white rounded hover:bg-destructive/90 transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
