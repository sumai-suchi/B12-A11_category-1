import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, XCircle, AlertTriangle, Activity, ShieldCheck, HeartPulse, RefreshCw } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../AuthContext/AuthContext';

export default function DonorEligibility() {
  const { user } = useContext(AuthContext);
  const [eligibilityData, setEligibilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      lastDonationDate: '',
      ageAndWeight: 'true',
      recentIllness: 'false',
      medications: 'false',
      travelHistory: 'false',
      tattoosOrPiercing: 'false'
    }
  });


  const onSubmit = async (data) => {
    if (!user?.email) {
      Swal.fire('Authentication Required', 'Please log into your account to submit metrics.', 'error');
      return;
    }

    setSubmitting(true);
    const payload = {
      email: user.email,
      lastDonationDate: data.lastDonationDate || null,
      checklist: {
        ageAndWeight: data.ageAndWeight === 'true',
        recentIllness: data.recentIllness === 'true',
        medications: data.medications === 'true',
        travelHistory: data.travelHistory === 'true',
        tattoosOrPiercing: data.tattoosOrPiercing === 'true',
      }
    };
    console.log(payload);

    try {
      const response = await axios.post(`http://localhost:5000/eligibility/update`, payload);
      setEligibilityData(response.data);
      console.log(response.data);
      
      Swal.fire({
        title: 'Screening Complete!',
        text: response.data.status === 'Can Donate' 
          ? 'Great news! You are eligible to donate blood now.' 
          : `Please wait ${response.data.daysToWait} days before your next donation.`,
        icon: response.data.status === 'Can Donate' ? 'success' : 'warning',
        confirmButtonColor: '#EF4444'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Submission Error',
        text: 'Failed to update records inside target collection databases.',
        icon: 'error',
        confirmButtonColor: '#EF4444'
      });
    } finally {
      setSubmitting(false);
    }
  };


    // Fetch data on component mount when the authenticated user is resolved
  useEffect(() => {
    if (user?.email) {
      fetchEligibilityRecords();
    } else {
      // If user object isn't loaded yet by Firebase provider, stop the loading splash
      setLoading(false);
    }
  }, [user?.email]);

  const fetchEligibilityRecords = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/eligibility/${user?.email}`);
      
      if (response.data) {
        setEligibilityData(response.data);
        
        // Pre-populate date picker and fields if a historical record exists
        if (response.data.lastDonationDate) {
          const formattedDate = new Date(response.data.lastDonationDate).toISOString().split('T')[0];
          reset({
            lastDonationDate: formattedDate,
            ageAndWeight: response.data.checklist?.ageAndWeight ? 'true' : 'false',
            recentIllness: response.data.checklist?.recentIllness ? 'true' : 'false',
            medications: response.data.checklist?.medications ? 'true' : 'false',
            travelHistory: response.data.checklist?.travelHistory ? 'true' : 'false',
            tattoosOrPiercing: response.data.checklist?.tattoosOrPiercing ? 'true' : 'false',
          });
        }
      }
    } catch (err) {
      // Catching the 404 cleanly here. If no history exists, we keep eligibilityData as null
      console.log("No initial screening history found for this donor account yet.");
    } finally {
      // CRITICAL FIX: Ensure loading turns false so the layout renders regardless of data presence
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="animate-spin text-red-500" size={40} />
          <p className="text-slate-600 font-medium">Fetching screening rules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top App Header Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-red-100 text-red-600 rounded-2xl shadow-inner">
            <HeartPulse size={36} className="animate-pulse" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Donor Eligibility Panel
          </h1>
          <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base">
            Instantly evaluate your vital conditions and track your medical cooldown timelines.
          </p>
        </div>

        {/* Dashboard Status Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Eligibility Indicator Badge Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-3xl shadow-xl flex flex-col justify-between text-white ${
              eligibilityData?.status === 'Can Donate' 
                ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700' 
                : 'bg-gradient-to-br from-rose-500 via-red-600 to-rose-700'
            }`}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                Live Status Assessment
              </span>
              <h2 className="text-3xl font-black mt-6 tracking-tight">
                {eligibilityData ? (eligibilityData.status === 'Can Donate' ? '🟢 Can Donate Now' : `🛑 Wait ${eligibilityData.daysToWait} Days`) : 'No Log History'}
              </h2>
              <p className="text-white/80 text-sm mt-3 leading-relaxed">
                {eligibilityData?.status === 'Can Donate' 
                  ? 'All vital benchmarks match system safezones. You are structurally ready to save lives today.' 
                  : eligibilityData 
                    ? 'Your body profile requires an recovery or cool-down gap phase before donating again.'
                    : 'Please fill out and submit the health check screening list below to establish initial parameters.'}
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-3 border-t border-white/20 pt-4">
              {eligibilityData?.status === 'Can Donate' ? <ShieldCheck size={32} /> : <AlertTriangle size={32} />}
              <div className="text-xs">
                <p className="text-white/60">Registered User ID:</p>
                <p className="font-mono font-semibold">{user?.email || 'Guest Session'}</p>
              </div>
            </div>
          </motion.div>

          {/* Timeline Milestones Info-Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Last Donation Date</span>
                <div className="p-2 bg-slate-100 text-slate-600 rounded-xl"><Calendar size={20} /></div>
              </div>
              <div className="mt-6">
                <p className="text-3xl font-black text-slate-800">
                  {eligibilityData?.lastDonationDate 
                    ? new Date(eligibilityData.lastDonationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) 
                    : 'None Recorded'}
                </p>
                <p className="text-xs text-slate-400 mt-1">Based on self-declared database logging records.</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Next Eligible Window</span>
                <div className={`p-2 rounded-xl ${eligibilityData?.status === 'Can Donate' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  <CheckCircle2 size={20} />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-3xl font-black text-slate-800">
                  {eligibilityData?.nextEligibleDate 
                    ? new Date(eligibilityData.nextEligibleDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) 
                    : 'Immediate / Pending'}
                </p>
                <p className="text-xs text-slate-400 mt-1">Standard 56-day gap or medical cooldown buffer calculation apply.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Master Entry & Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Medical Checklist Input Form */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Activity className="text-red-500" size={24} />
              <h3 className="text-xl font-bold text-slate-800">Interactive Health Matrix Form</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Date Input Field */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">When was your last donation date?</label>
                <input 
                  type="date" 
                  {...register('lastDonationDate')} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white focus:outline-none transition-all text-slate-700 font-medium" 
                />
              </div>

              {/* Dynamic Question List Blocks */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Medical Diagnostic Checklist</h4>
                
                {[
                  { name: 'ageAndWeight', q: 'Are you aged 17–65 and weigh at least 50 kg (110 lbs)?' },
                  { name: 'recentIllness', q: 'Have you experienced any fever, cold, or flu signs in the last 7 days?' },
                  { name: 'medications', q: 'Are you currently taking any prescription antibiotics or blood thinners?' },
                  { name: 'travelHistory', q: 'Have you traveled to malaria, dengue, or virus-endemic zones recently?' },
                  { name: 'tattoosOrPiercing', q: 'Have you received tattoos, body modification, or piercing in the last 6 months?' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl gap-4 border border-slate-100 hover:bg-slate-100/50 transition-colors">
                    <span className="text-sm font-semibold text-slate-700 leading-snug">{item.q}</span>
                    <div className="flex gap-6 shrink-0">
                      <label className="inline-flex items-center gap-2 cursor-pointer group">
                        <input type="radio" value="true" {...register(item.name)} className="radio radio-error border-slate-300" />
                        <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">Yes</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer group">
                        <input type="radio" value="false" {...register(item.name)} className="radio radio-error border-slate-300" />
                        <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">No</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Submit Control Button */}
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {submitting ? <RefreshCw className="animate-spin" size={18} /> : null}
                Evaluate Conditions & Save Record
              </button>
            </form>
          </div>

          {/* Summary Audit Tracker List Card */}
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Medical Vitals Check</h3>
              <p className="text-xs text-slate-400">Live data readouts stored securely inside your isolation tables.</p>
            </div>

            {eligibilityData?.checklist ? (
              <div className="space-y-4 divide-y divide-slate-100">
                <div className="flex justify-between items-center py-2 pt-0">
                  <span className="text-sm font-medium text-slate-500">Age & Mass Limits</span>
                  {eligibilityData.checklist.ageAndWeight ? <CheckCircle2 className="text-emerald-500" size={20} /> : <XCircle className="text-rose-500" size={20} />}
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-medium text-slate-500">Fever/Infection Free</span>
                  {!eligibilityData.checklist.recentIllness ? <CheckCircle2 className="text-emerald-500" size={20} /> : <XCircle className="text-rose-500" size={20} />}
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-medium text-slate-500">No Target Antibiotics</span>
                  {!eligibilityData.checklist.medications ? <CheckCircle2 className="text-emerald-500" size={20} /> : <XCircle className="text-rose-500" size={20} />}
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-medium text-slate-500">No Endemic Region Travel</span>
                  {!eligibilityData.checklist.travelHistory ? <CheckCircle2 className="text-emerald-500" size={20} /> : <XCircle className="text-rose-500" size={20} />}
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-medium text-slate-500">No Recent Needle/Tattoos</span>
                  {!eligibilityData.checklist.tattoosOrPiercing ? <CheckCircle2 className="text-emerald-500" size={20} /> : <XCircle className="text-rose-500" size={20} />}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                <p className="text-sm text-slate-400 italic px-4">No active records parsed. Submit the form layout to generate live parameters indicators.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}