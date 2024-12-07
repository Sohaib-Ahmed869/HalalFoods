import React, { useState,useRef,useEffect } from "react";

import {
  BiPlus,
  BiPlay,
  BiMessage,
  BiReceipt,
  BiUser,
  BiCog,
  BiWrench,
} from "react-icons/bi";

const HelpCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-teal-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b last:border-b-0">
      <button
        className="w-full py-4 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        <BiPlus
          className={`w-5 h-5 text-teal-600 transform transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height }}
      >
        <div ref={contentRef} className="pb-4 text-gray-600">
          {answer}
        </div>
      </div>
    </div>
  );
};

const HelpCenter = () => {
  const helpCards = [
    {
      icon: BiPlay,
      title: "Getting Started",
      description: "Learn the basics of using our dashboard and core features",
    },
    {
      icon: BiMessage,
      title: "Contact Us",
      description: "Get in touch with our support team for assistance",
    },
    {
      icon: BiReceipt,
      title: "Subscription & Billing",
      description: "Manage your subscription, payments, and billing details",
    },
    {
      icon: BiUser,
      title: "Teams & Access",
      description: "Learn about user roles, permissions, and team management",
    },
    {
      icon: BiCog,
      title: "Integrations",
      description: "Connect and configure third-party integrations",
    },
    {
      icon: BiWrench,
      title: "Trouble Shooting",
      description: "Find solutions to common issues and technical problems",
    },
  ];

  const faqs = [
    {
      question: "How do I view my sales analytics?",
      answer:
        "You can view your sales analytics in the dashboard's 'Sales by Tags' section. This displays your sales data with breakdowns by category, trends over time, and key metrics like total sales and customer information.",
    },
    {
      question: "How do I manage my purchases and invoices?",
      answer:
        "Access the 'Purchases' section to view and manage all transactions. You can filter by tags, verify transactions, and track payment status. For invoices, use the invoice list view to see all imported invoices, their status, and payment details.",
    },
    {
      question: "How do I export my sales or purchase reports?",
      answer:
        "In both the sales and purchases dashboards, look for the 'Export PDF' button in the top right corner. This allows you to download detailed reports for your selected time period.",
    },
    {
      question: "How do I track payment correlations?",
      answer:
        "The payment correlation section in the dashboard shows the distribution of payments across different categories like own companies, collection sales, and delivery sales, with visual progress bars for easy comparison.",
    },
    {
      question: "How do I manage user access and permissions?",
      answer:
        "Navigate to the Teams & Access section where you can add new users, assign roles, and set specific permissions for different team members to access various parts of the system.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Help Center</h1>
        <p className="text-gray-600 mb-8">How can we help you today?</p>
        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
          Schedule a demo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {helpCards.map((card, index) => (
          <HelpCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="bg-white rounded-lg shadow-sm">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
