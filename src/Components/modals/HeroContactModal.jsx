import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import axios from 'axios';

const HeroContactModal = ({ donor, closeModal }) => {
  const [formData, setFormData] = useState({
    requesterEmail: '',
    requestMessage: '',
    requestDetails: ''
  });
  console.log(donor);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        donorId: donor._id,
        donorEmail: donor.email,
        donorName: donor.name,
        donorBloodGroup: donor.bloodGroup,
        requesterEmail: formData.requesterEmail,
        requestMessage: formData.requestMessage,
        requestDetails: formData.requestDetails,
        status: 'pending'
      };

      console.log(dataToSubmit);

      const res = await axios.post('http://localhost:5000/hero-contact', dataToSubmit);
      if (res.status === 201) {
        alert("Your request has been successfully sent to the hero!");
        closeModal();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl relative"
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-rose-500 to-red-600 p-6 text-white flex justify-between items-start relative overflow-hidden">
          {/* Background decorative circle */}
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-black tracking-tight mb-1">Contact Hero</h2>
            <p className="text-rose-100 text-sm font-medium">Send a blood request to {donor.name}</p>
          </div>
          <button 
            onClick={closeModal}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md relative z-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Your Email</label>
              <input
                type="email"
                name="requesterEmail"
                required
                placeholder="you@example.com"
                value={formData.requesterEmail}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Request Message</label>
              <textarea
                name="requestMessage"
                required
                rows="3"
                placeholder="Explain why you need blood urgently..."
                value={formData.requestMessage}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Additional Details (Optional)</label>
              <textarea
                name="requestDetails"
                rows="2"
                placeholder="Hospital name, contact number, etc."
                value={formData.requestDetails}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-200 flex items-center justify-center gap-2 transition-all duration-300"
            >
              {isSubmitting ? (
                "Sending Request..."
              ) : (
                <>
                  <Send size={18} />
                  Send Blood Request
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default HeroContactModal;
