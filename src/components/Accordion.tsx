import { useState, useRef, ReactNode } from 'react';

interface PropsType {
  title: string,
  show?: boolean,
  children: ReactNode
}

export default function Accordion ({ title, show, children }: PropsType) {
  const [isOpen, setIsOpen] = useState(show);
  const detailRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="py-[16px] text-base border-b last:border-b-0">
      <button type="button" onClick={toggleAccordion} className="w-full py-1 flex items-end justify-between gap-3">
        <div>{title}</div>
        <div className="text-xl">{isOpen ? '-':'+'}</div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'
          }`}
        style={{
          maxHeight: isOpen ? `${detailRef.current?.scrollHeight}px` : '0px',
        }}
        ref={detailRef}
      >
        {children}
      </div>
    </div>
  );
}