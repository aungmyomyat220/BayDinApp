'use client'
import React, {useRef, useState} from 'react';
import {getAnswers, getQuestions} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import Image from "next/image";
import BackKey from '../../../image/left-arrow.png'
import RightKey from '../../../image/arrow-right.png'
import MinTheinKha from "../../../image/mintheinkhalogo.png";
const MainBody = () => {
    const randomNumbers = ["၃","၁၀","၅","၁၀","၇","၂","၅","၂","၇","၈","၆","၄","၅","၃","၁","၁၀","၈","၆","၇","၂","၉","၄","၉","၆","၉","၄","၁","၈","၅","၁၀","၆","၃","၈","၄","၁","၆","၃","၁","၉","၁","၉","၇","၉","၇","၅","၂","၇","၄","၁၀","၅","၂","၈","၃","၁၀","၇","၄","၉","၂","၉","၄","၉","၆","၁","၂","၁၀","၈","၇","၅","၃","၄","၂","၁၀","၁","၆","၃","၆","၁","၈","၃","၈","၅"]
    const {data : questions=[]} = useQuery({queryKey:['getQuestions'],queryFn:(getQuestions)})
    const {data : answers=[]} = useQuery({queryKey:['getAnswers'],queryFn:(getAnswers)})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedAnswer, setClickedAnswer] = useState(false);
    const [selectedQuestion , setSelectedQuestion] = useState("")
    const [result , setResult] = useState("")
    const [answerForSelectedQuestion , setAnswerForSelectedQuestion] = useState([])
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleQuestions = questions.slice(startIndex, endIndex);
    const modalRef = useRef(null);
    const openModal = (questionNo) => {
        setIsModalOpen(true);
        filterAnswer(questionNo)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleModalClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    React.useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('click', handleModalClick);
        }
        return () => {
            document.removeEventListener('click', handleModalClick);
        };
    }, [isModalOpen]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filterAnswer = (questionNo) => {
        const filterQuestion = questions.find(question => question.questionNo === questionNo)
        const filteredAnswer = answers.filter(answer => answer.questionNo === questionNo)
        setSelectedQuestion(filterQuestion.questionName)
        setAnswerForSelectedQuestion(filteredAnswer)
    };

    function myanmarToEnglishNumber(myanmarNumber) {
        if (typeof myanmarNumber !== 'string') {
            myanmarNumber = myanmarNumber.toString();
        }
        const myanmarDigits = ['၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉','၁၀'];
        const englishDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9','10'];

        for (let i = 0; i < myanmarDigits.length; i++) {
            myanmarNumber = myanmarNumber.replace(new RegExp(myanmarDigits[i], 'g'), englishDigits[i]);
        }
        return myanmarNumber;
    }

    const clickAnswer = (answerNo) =>{
        const englishNo = myanmarToEnglishNumber(answerNo)
        setResult(answerForSelectedQuestion[englishNo].answerResult)
        setClickedAnswer(true)
        closeModal()
    }

    return (
        <div className='mt-10 flex flex-col justify-center mx-40'>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg" ref={modalRef}>
                            &times;
                        <p className='text-2xl text-amber-900 font-bold text-center'>လက်ထောက်ဗေဒင်</p>
                        <p className='font-bold text-center text-amber-700 mt-5'>{selectedQuestion}</p>
                        <div className='my-10 text-black flex justify-center'>
                            <div className='grid grid-cols-9'>
                            {randomNumbers.map((randomNumber,index) => (
                                <span key={index} className='bg-amber-900 text-white mr-1 w-10 mt-1 h-10 flex justify-center items-center' onClick={() => clickAnswer(randomNumber)}>{randomNumber}</span>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {clickedAnswer && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg" ref={modalRef}>
                        &times;
                        <div className='flex justify-center'>
                            <Image src={MinTheinKha} alt="MinTheinKhaLogo" className='w-24 h-24 rounded-full mr-5'></Image>
                        </div>
                        <p className='font-bold text-center text-amber-700 mt-3 text-2xl'>လက်ထောက်ဗေဒင်</p>
                        <p className='text-center font-bold mt-6'>{result}</p>
                        <div className='flex justify-center'>
                            <button className='mt-6 bg-amber-900 text-white py-2 px-2 rounded-xl' onClick={() => setClickedAnswer(false)}>ထပ်မေးမည်</button>
                        </div>

                    </div>
                </div>
            )}


            <input type="text" className="input input-bordered rounded-lg" placeholder="သိလိုသည်များကိုရှာဖွေပါ..."/>
            <table className="bg-gray-100 table-auto border-2 border-collapse border-black w-full mt-5 text-amber-900 font-bold">
                <tbody>
                {visibleQuestions.map((question, index) => (
                    <tr key={index}>
                        <td className="border border-black p-2 text-center">{question.questionNo}</td>
                        <td
                            className="border border-black p-2 hover:cursor-pointer"
                            onClick={() => openModal(question.questionNo)}
                        >
                            {question.questionName}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className="mt-3 flex justify-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <Image src={BackKey} alt='left-arrow' className='h-7 w-7'></Image>
                </button>
                <span className="mx-2">
          Page {currentPage} of {Math.ceil(questions.length / itemsPerPage)}
        </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={endIndex >= questions.length}
                >
                    <Image src={RightKey} alt='left-arrow' className='h-9 w-9'></Image>
                </button>
            </div>
        </div>
    );
};

export default MainBody;