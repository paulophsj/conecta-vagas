import { FindAllComments } from '@/services/FindAllComments';
import { useEffect, useState } from 'react';
import CommentsCard from './CommentsCard';

export default function CommentsList({ quantidade }) {
    const [slides, setSlides] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await FindAllComments();
                setSlides(Array.isArray(response) ? response : []);
            } catch (error) {
                console.error("Erro ao buscar comentários:", error);
            }
        };
        fetchComments();
    }, []);

    useEffect(() => {
        if (slides.length > 0) {
            const interval = setInterval(() => {
                setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [slides.length]);

    return (
        <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-2xl -z-10">
            <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {slides.length === 0 ? (
                    <p className="text-center text-gray-500 w-full">Carregando comentários...</p>
                ) : (
                    slides.map((slide, index) => (
                        <div className="flex-shrink-0 w-full" key={index}>
                            <CommentsCard comments={slide} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}