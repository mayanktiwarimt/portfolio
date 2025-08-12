import React, {useState, useEffect, useRef} from 'react'
import { motion } from 'framer-motion'
import { SunMoon, Menu, X, Search, Github, Linkedin } from 'lucide-react'

export default function App(){
  const [dark, setDark] = useState(true)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([{from: "bot", text: "Hi! I can help you finding projects, skills, education, and contact info of Mayank Tiwari's portfolio. Try: 'arduino' or 'skills'"}])
  const inputRef = useRef(null)

  useEffect(()=>{ document.documentElement.classList.toggle("dark", dark) }, [dark])

  const projects = [
    {id:1,title:"Hand Gesture to Voice Converter (Arduino UNO)",tags:["arduino","embedded","assistive"],desc:"Wearable prototype using flex sensors and Arduino UNO to translate hand gestures into voice commands for assistive technology.",certs:["/certs/hand_gesture_certificate.pdf"]},
    {id:2,title:"IoT UPS Temperature Monitor (ITC Limited)",tags:["esp32","iot","ds18b20"],desc:"IoT-based UPS temperature monitoring system using ESP32 and DS18B20 for real-time data acquisition and monitoring.",certs:["/certs/itc_ups_certificate.pdf"]},
    {id:3,title:"E‑commerce UI",tags:["nextjs","tailwind","stripe"],desc:"Fast product browsing with cart and checkout integration."},
    {id:4,title:"Portfolio CMS",tags:["react","sanity","graphql"],desc:"Headless CMS-driven portfolio with live previews."},
    {id:5,title:"Algorithm Visualizer",tags:["javascript","canvas","d3"],desc:"Interactive visualizations for sorting and graph algorithms."}
  ]

  const skills = [
    {name:"c++",level:90},
    {name:"embedded programming",level:85},
    {name:"python",level:80},
    {name:"c",level:75},
    {name:"matlab",level:70},
    {name:"dsa",level:85},
    {name:"circuit simulation",level:75}
  ]

  const socialLinks = [
    {name:'github',href:'https://github.com/mayanktiwarimt',icon:<Github size={16}/>},
    {name:'linkedin',href:'https://linkedin.com/in/mayanktiwarimtr',icon:<Linkedin size={16}/>},
    {name:'leetcode',href:'https://leetcode.com/u/begineercoder/',icon:<img src='https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/leetcode.svg' alt='leetcode' className='w-4 h-4'/>},
    {name:'codeforces',href:'https://codeforces.com/profile/mayanktiwarimtr',icon:<img src='https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/codeforces.svg' alt='codeforces' className='w-4 h-4'/>},
    {name:'gfg',href:'https://www.geeksforgeeks.org/user/mayanktiwarimtr/',icon:<img src='https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/geekforgeeks.svg' alt='gfg' className='w-4 h-4'/>},
    {name:'codechef',href:'https://www.codechef.com/users/mayank_tiwari2',icon:<img src='https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/codechef.svg' alt='codechef' className='w-4 h-4'/>}
  ]

  function searchSite(q){
    const t = q.toLowerCase()
    if(!t) return {matches:[],reply:"Try typing something to search: projects, skills, contact"}
    const p = projects.filter(p=> p.title.toLowerCase().includes(t) || p.desc.toLowerCase().includes(t) || p.tags.join(' ').includes(t))
    const s = skills.filter(s=> s.name.includes(t))
    const hits = []
    if(p.length) hits.push({type:"projects", items:p})
    if(s.length) hits.push({type:"skills", items:s})
    if(t.includes("contact") || t.includes("email") || t.includes("reach")) hits.push({type:"contact", items:[{email:"mayanktila444@gmail.com", phone:"+91 8273305198"}]})
    if(hits.length) return {matches: hits, reply: `found ${hits.length} matches`}
    return {matches:[], reply:"no longer messages this is not AI — try shorter keywords like 'contact' or 'project'"}
  }

  function handleSend(){
    const text = query.trim()
    if(!text) return
    const userMsg = {from:"user", text}
    setMessages(m=>[...m, userMsg])
    setQuery("")
    setTimeout(()=>{
      const r = searchSite(text)
      if(r.matches.length){
        const chunks = r.matches.map(m=>{
          if(m.type==="projects") return "Projects:\n" + m.items.map(p=>`- ${p.title}: ${p.desc}`).join('\n')
          if(m.type==="skills") return "Skills:\n" + m.items.map(s=>`- ${s.name} (${s.level}%)`).join('\n')
          if(m.type==="contact") return "Contact:\n" + m.items.map(c=>`- email: ${c.email} \n- phone: ${c.phone}`).join('\n')
          return ""
        }).join('\n\n')
        setMessages(m=>[...m, {from:"bot", text:chunks}])
      } else {
        setMessages(m=>[...m, {from:"bot", text:r.reply}])
      }
      setTimeout(()=>{ inputRef.current?.focus() }, 50)
    }, 500)
  }

  function handleKey(e){ if(e.key === "Enter") handleSend() }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <header className="fixed w-full z-40 bg-opacity-60 backdrop-blur p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-semibold text-xl">Mayank Tiwari</div>
            <nav className="hidden md:flex gap-4 text-sm opacity-80">
              <a href="#about" className="hover:underline">About</a>
              <a href="#skills" className="hover:underline">Skills</a>
              <a href="#projects" className="hover:underline">Projects</a>
              <a href="#contact" className="hover:underline">Contact</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={()=>setChatOpen(v=>!v)} className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center gap-2">
              <Search size={16}/> Help
            </button>
            <button onClick={()=>setDark(d=>!d)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
              <SunMoon size={18}/>
            </button>
            <button className="md:hidden p-2" onClick={()=>setOpen(o=>!o)}>
              {open ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden mt-3">
            <div className="flex flex-col gap-2 px-4">
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        )}
      </header>

      <main className="pt-24">
        <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{duration:0.5}}>
            <h1 className="text-4xl md:text-5xl font-bold">Hi, I'm Mayank<span className="text-indigo-500">.</span></h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">Full-stack engineer building fast, accessible, and delightful web experiences. I make production-ready apps and delightful UIs.</p>
            <div className="mt-6 flex gap-3">
              <a href="#projects" className="px-4 py-2 rounded-lg bg-indigo-600 text-white">See projects</a>
              <a href="#contact" className="px-4 py-2 rounded-lg border">Contact me</a>
            </div>
            <div className="mt-8 flex gap-4 items-center text-sm opacity-90">
              {socialLinks.map(s=> (
                <a key={s.name} className="flex items-center gap-2" href={s.href} target="_blank" rel="noreferrer">{s.icon}<span className="capitalize">{s.name}</span></a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:0.5}} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Quick Info</h3>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              <p>Embedded systems, IoT, web dev, algorithms</p>
              <p className="mt-2">Open to opportunities & collaboration.</p>
              <div className="mt-4 flex gap-2">
                <a href="/Mayank_Tiwari_Resume.pdf" className="px-3 py-2 border rounded">Resume</a>
                <a href="#contact" className="px-3 py-2 bg-indigo-600 text-white rounded">Hire me</a>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-gray-600 dark:text-gray-300">As an embedded systems enthusiast and competitive programmer, I aim to develop efficient, real-time solutions
that enhance automation and accessibility. By leveraging my skills in C++ and microcontroller programming, I strive
to create impactful technologies for societal benefit.</p>
        </section>

        <section id="skills" className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skills.map(s=>(
              <div key={s.name} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="font-medium capitalize">{s.name}</div>
                  <div className="text-xs">{s.level}%</div>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full mt-3">
                  <div className="h-2 rounded-full bg-indigo-500" style={{width: `${s.level}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-6">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map(p=>(
              <div key={p.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <div className="text-sm opacity-80">{p.tags.join(' • ')}</div>
                </div>
                <p className="mt-3 text-gray-600 dark:text-gray-300">{p.desc}</p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {p.tags.map(t=>(
                    <span key={t} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">{t}</span>
                  ))}
                </div>
                {p.certs && (
                  <div className="mt-4 text-sm">
                    {p.certs.map((c,i)=>(
                      <a key={i} href={c} className="underline mr-3">certificate</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold">Get in touch</h3>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Email: <a href="mailto:mayanktila444@gmail.com" className="underline">mayanktila444@gmail.com</a></p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Phone: +91 8273305198</p>
              <div className="mt-4 flex gap-2">
                {socialLinks.map(s=>(
                  <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded">{s.icon}<span className="text-sm">{s.name}</span></a>
                ))}
              </div>
            </div>

            <form action="#" className="p-6 bg-white dark:bg-gray-800 rounded-lg">
              <input name="_subject" type="hidden" value="Portfolio contact" />
              <div className="grid gap-3">
                <input name="name" placeholder="Your name" className="p-3 rounded border dark:bg-gray-900" />
                <input name="email" placeholder="Your email" className="p-3 rounded border dark:bg-gray-900" />
                <textarea name="message" placeholder="Message" className="p-3 rounded border dark:bg-gray-900 h-32" />
                <button type="button" className="px-4 py-2 bg-indigo-600 text-white rounded">Send</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <div className={`fixed right-6 bottom-6 w-80 max-w-full ${chatOpen ? '' : 'translate-y-6 opacity-90'} transition-all`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Search size={16}/>
              <div className="font-medium">Portfolio assistant</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>setChatOpen(false)} className="px-2 py-1">Close</button>
            </div>
          </div>

          <div className="p-3 h-56 overflow-y-auto" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)'}}>
            {messages.map((m,i)=> (
              <div key={i} className={`mb-3 ${m.from==='user' ? 'text-right' : ''}`}>
                <div className={`${m.from==='user' ? 'inline-block bg-indigo-600 text-white' : 'inline-block bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'} px-3 py-2 rounded-lg`}>{m.text}</div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={handleKey} placeholder="Search projects, skills, contact..." className="flex-1 p-2 rounded border dark:bg-gray-900" />
              <button onClick={handleSend} className="px-3 py-2 bg-indigo-600 text-white rounded">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
