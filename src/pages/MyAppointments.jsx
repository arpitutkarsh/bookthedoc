import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import QRCode from 'qrcode';
import html2pdf from 'html2pdf.js';

function MyAppointments() {
  const { accessToken, backendUrl, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  const prescriptionRef = useRef(); // ✅ Moved here

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowPrescriptionModal(false);
      }
    };
    if (showPrescriptionModal) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showPrescriptionModal]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/v1/user/listappointment', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (data.success) setAppointments(data.data.appointments);
    } catch (error) {
      console.log(error);
      toast.error('Error in Getting your Data');
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/v1/user/cancel',
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (data.success) {
        toast.success('Appointment Cancelled');
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error('Error Cancelling your Appointment');
      }
    } catch (error) {
      console.log(error);
      toast.error("Can't cancel your Appointment");
    }
  };

  const fetchpres = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/v1/user/prescription', { appointmentId });
      if (data.success) {
        setSelectedPrescription(data.data);
        setShowPrescriptionModal(true);
        toast.success('Prescription Fetched Successfully');
      } else {
        toast.error('Prescription not found');
      }
    } catch (error) {
      toast.error('No prescription found');
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) getUserAppointments();
  }, [accessToken]);

  useEffect(() => {
    if (showPrescriptionModal && selectedPrescription) {
      const qrText = `Prescription No: ${selectedPrescription.prescriptionNumber}\nDoctor: ${selectedPrescription.doctor?.name}\nPatient: ${selectedPrescription.user?.name}\nDate: ${selectedPrescription.date} - by booktheDoc`;
      QRCode.toDataURL(qrText).then((url) => {
        const qrImg = document.getElementById('qrImg');
        if (qrImg) qrImg.src = url;
      });
    }
  }, [showPrescriptionModal, selectedPrescription]);

  return (
    <div>
      <p className="pb-3 mt-12 ml-5 mr-5 font-medium text-zinc-600 border-b-4">My Appointments</p>
      <div>
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 ml-5 mr-5 mb-2 border-b"
          >
            <div>
              <img className="w-32 bg-amber-500" src={item.docData.image} />
            </div>
            <div className="flex-1 text-sm text-black">
              <p className="font-bold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-l mt-2">
                <span className="font-semibold underline">Date and Time</span>:
                <span className="italic"> {item.slotDate.replaceAll('_', ' / ')} | {item.slotTime}</span>
              </p>
              {!item.cancelled && (
                <p className="text-medium italic">Download your Prescription after the Appointment</p>
              )}
            </div>
            <div className="flex flex-col gap-3 justify-end">
              {item.cancelled ? (
                <button className="text-xs font-semibold text-center p-2 border rounded-full text-red-600">
                  Appointment Cancelled
                </button>
              ) : item.isCompleted ? (
                <>
                  <button
                    onClick={() => fetchpres(item._id)}
                    className="text-xs font-semibold text-gray-700 text-center p-2 border rounded-full hover:bg-green-400 duration-500"
                  >
                    Get your Prescription
                  </button>
                  <button className="text-xs font-semibold text-center p-2 border rounded-full text-green-500 border-green-500">
                    Appointment Completed
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => fetchpres(item._id)}
                    className="text-xs font-semibold text-gray-700 text-center p-2 border rounded-full hover:bg-green-400 duration-500"
                  >
                    Get your Prescription
                  </button>
                  <button className="text-xs font-semibold text-gray-700 text-center p-2 border rounded-full hover:bg-green-400 duration-500">
                    Pay Online (Launching Soon)
                  </button>
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-xs text-gray-700 text-center p-2 border rounded-full hover:bg-red-500 font-semibold transition-all duration-500"
                  >
                    Cancel Appointment
                  </button>
                </>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* ================= PRESCRIPTION MODAL ================= */}
      {showPrescriptionModal && selectedPrescription && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto print:bg-white print:relative">
          <div
            ref={prescriptionRef} // ✅ Important: ref moved here
            className="bg-white max-w-4xl mx-auto mt-10 p-8 rounded-lg shadow-lg print:shadow-none print:border print:rounded-none print:m-0 print:p-8"
          >
            <button
              onClick={() => setShowPrescriptionModal(false)}
              className="absolute top-3 right-4 text-gray-600 text-2xl hover:text-red-500 print:hidden"
              aria-label="Close"
            >
              &times;
            </button>

            {/* === Clinic Header === */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold text-blue-900">BookTheDoc<span className='text-xs font-semi-bold'> Connecting you to Care,Effortlessly!</span></h1>
                <p className="text-sm text-gray-700">Medical Prescription</p>
                <p className="text-sm text-gray-700 font-bold">
                  Prescription No:{' '}
                  <span className="font-medium font-mono">{selectedPrescription.prescriptionNumber}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Date: <span className='font-mono'>{selectedPrescription.date?.replaceAll('_', '-')} |</span> Time:<span className='font-mono'>{' '}
                    {selectedPrescription.time}</span>
                </p>
              </div>
              <img id="qrImg" src="" alt="QR Code" className="w-24 h-24 border rounded-md" />
            </div>

            {/* === Details Section (Doctor/Patient) === */}
            <div className="grid grid-cols-2 gap-50 mb-6 text-sm text-gray-800">
              <div>
                <h2 className="font-semibold text-blue-800 mb-1 underline">Doctor Details</h2>
                <p>
                  <strong>Name:</strong> <span className='font-mono'>{selectedPrescription.doctor.name}</span>
                </p>
                <p>
                  <strong>Email: </strong><span className='font-mono'>{selectedPrescription.doctor.email}</span>
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-blue-800 mb-1 underline">Patient Details</h2>
                <p>
                  <strong>Name:</strong> <span className='font-mono'>{selectedPrescription.user.name}</span>
                </p>
                <p>
                  <strong>Gender:</strong> <span className='font-mono'>{selectedPrescription.user.gender}</span>
                </p>
                <p>
                  <strong>Email:</strong> <span className='font-mono'>{selectedPrescription.user.email}</span>
                </p>
                <p>
                  <strong>Phone:</strong> <span className='font-mono'>{selectedPrescription.user.phone}</span>
                </p>
              </div>
            </div>

            {/* === Vitals === */}
            <div className="mb-4">
              <h2 className="text-blue-800 font-semibold underline"> Vitals</h2>
              <ul className="list-inside list-disc text-sm mt-1 text-gray-800">
                <li > Pulse Rate: <span className='font-mono'>{selectedPrescription.pulseRate || 'N/A'} bpm </span ></li>
                <li>Blood Pressure: <span className='font-mono'>{selectedPrescription.bp || 'N/A'} mmHg</span></li>
                <li>SpO₂: <span className='font-mono'>{selectedPrescription.spo2 || 'N/A'}</span></li>
                <li>Temperature: <span className='font-mono'>{selectedPrescription.temperature || 'N/A'} °C </span></li>
              </ul>
            </div>

            {/* === Diagnosis === */}
            <div className="mb-4">
              <h2 className="text-blue-800 font-semibold underline">Diagnosis</h2>
              <p className="text-sm mt-1 text-gray-800"><span className='font-mono'>{selectedPrescription.diagnosis}</span></p>
            </div>

            {/* === Medicines Table === */}
            <div className="mb-4">
              <h2 className="text-blue-800 font-semibold underline">Medicines</h2>
              <table className="w-full text-sm mt-2 border border-gray-300">
                <thead className="bg-blue-100 text-left">
                  <tr>
                    <th className="border px-2 py-1">#</th>
                    <th className="border px-2 py-1">Name</th>
                    <th className="border px-2 py-1">Dosage</th>
                    <th className="border px-2 py-1">Frequency</th>
                    <th className="border px-2 py-1">Duration and Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPrescription.medicines.map((med, idx) => (
                    <tr key={idx}>
                      <td className="border font-mono px-2 py-1">{idx + 1}</td>
                      <td className="border px-2 py-1 font-mono">{med.name}</td>
                      <td className="border font-mono px-2 py-1">{med.dosage}</td>
                      <td className="border font-mono px-2 py-1">{med.frequency}</td>
                      <td className="border font-mono px-2 py-1">{med.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* === Lifestyle Advice & Tests === */}
            <div className="mb-4">
              <h2 className="text-blue-800 font-semibold underline">Lifestyle Advice</h2>
              <p className="text-sm mt-1 font-mono text-gray-800">{selectedPrescription.lifestyle}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-blue-800 font-semibold underline">Recommended Tests</h2>
              <p className="text-sm mt-1 font-mono text-gray-800">{selectedPrescription.tests}</p>
            </div>

            {/* === Follow-Up === */}
            <div className="mb-4">
              <h2 className="text-blue-800 font-semibold underline">Follow-Up</h2>
              <p className="text-sm mt-1 text-gray-800 font-mono">
                Visit the Clinic on - {selectedPrescription.followUp}(yyyy-mm-dd)
              </p>
            </div>

            {/* === Notes === */}
            <div className="mb-6">
              <h2 className="text-blue-800 font-semibold underline">Notes for Patient</h2>
              <ul className="list-disc list-inside text-sm text-gray-800 mt-1 font-mono">
                <li>Take medicines exactly as prescribed.</li>
                <li>Report any unusual symptoms or side effects immediately.</li>
                <li>Complete the full course of medicines.</li>
                <li>Contact your doctor if symptoms worsen.</li>
                <li>Avoid self-medication without consultation.</li>
                <li>Maintain a healthy lifestyle and stay hydrated.</li>
                <li>Follow up on the recommended tests and next appointment.</li>
              </ul>
            </div>
            <div className="text-right font-mono">
              {selectedPrescription.doctor.name}
            </div>
            <div className='align-text-bottom mt-10 text-xs font-mono border-t-2 border-black'>
              <p className='ml-4 text-[11px] text-gray-700'>
                *This is a computer generated prescription and hence does not require Signature.
              </p>
              <p className='ml-4 text-[11px] text-gray-700'>*Scan the QR to check the Authenticity of Prescription(check if all the details are correct or not)</p>
              <p className='ml-4 text-[11px] text-gray-700 '>
                *BookTheDoc is not responsible for any misuse, forgery, or unauthorized reproduction of this prescription. Always consult your doctor before making any health decisions.
              </p>
              <p className='ml-4 text-[11px] text-gray-700'>
                *The information provided herein is based on the consultation between the patient and the registered medical professional.
              </p>
              <p className='ml-4 text-[11px] text-gray-700'>
                *Always follow your doctor’s advice. Do not self-medicate or alter dosage without proper consultation.
              </p>
              <p className='ml-4 text-[11px] text-gray-700'>
                *BookTheDoc shall not be held liable for any health outcomes resulting from misinterpretation or non-compliance with this prescription.
              </p>
            </div>

            {/* === Download PDF === */}
            <div className="text-center print:hidden">
              <button
                onClick={() => {
                  if (!prescriptionRef.current) {
                    toast.error('Prescription not ready!');
                    return;
                  }

                  setTimeout(() => {
                    const opt = {
                      margin: 0.5,
                      filename: `BTD${selectedPrescription.prescriptionNumber}.pdf`,
                      image: { type: 'jpeg', quality: 0.98 },
                      html2canvas: { scale: 2, useCORS: true },
                      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                    };

                    html2pdf().set(opt).from(prescriptionRef.current).save();
                  }, 100);
                }}

              >

              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
