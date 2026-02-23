import { useScrollReveal } from '../hooks/useScrollReveal'

export function ScrollReveal({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
