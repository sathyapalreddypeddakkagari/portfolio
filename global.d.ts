// Ambient module declarations so TypeScript stops complaining about
// non-code imports that webpack/Next handle natively.
declare module '*.css'
declare module '*.scss'
declare module '*.sass'
declare module '*.module.css'
declare module '*.svg' {
  const content: string
  export default content
}
