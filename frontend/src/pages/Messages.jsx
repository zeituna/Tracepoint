import React from 'react'

const Messages = () => {
  const conversations = [
    { id: 1, name: 'Amina Hassan', lastMessage: 'Any updates on the case?', time: '2 min ago', unread: true },
    { id: 2, name: 'Fatumia Ali', lastMessage: 'I have new information to share.', time: '1 hour ago', unread: false },
    { id: 3, name: 'Peter Otieno', lastMessage: 'Thank you for your help.', time: '3 hours ago', unread: false },
    { id: 4, name: 'Sarah Wanjiru', lastMessage: 'When can we meet?', time: '5 hours ago', unread: true },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Your conversations</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
          ✏️ New Message
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {conversations.map((conv) => (
          <div key={conv.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold text-lg">
              {conv.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="font-semibold text-gray-900 dark:text-white">{conv.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{conv.time}</p>
              </div>
              <p className={`text-sm truncate ${conv.unread ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                {conv.lastMessage}
              </p>
            </div>
            {conv.unread && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary-600"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messages
