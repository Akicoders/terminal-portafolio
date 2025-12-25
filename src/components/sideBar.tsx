/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useRef, useState } from "react"
import { Fragment } from "react"
import { Dialog, Menu, Transition } from "@headlessui/react"
import { Item } from "../utils/effect/BtnEffect"
import Link from "next/link"
import "../utils/effect/BtnEffect.css"
import { usePathname } from "next/navigation"
import { useConfirmContext } from "./context/ConfirmContext"
import { useI18n } from "../utils/i18n"
import { useAppearance } from "../utils/appearanceProvider"
import gsap from "gsap"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

function BtnSide() {
  const hoverRef = useRef(null)
  useEffect(() => {
    if (hoverRef.current) {
      new Item(hoverRef.current)
    }
  }, [])

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  id="modal"
                  className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Comandos disponibles
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Escribe &apos;help&apos; para ver la lista de comandos.
                      <br />
                      🎉 Prueba el comando &apos;neofetch&apos; o &apos;theme&apos; para personalizar.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-cyan-500 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      ¡Entendido!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Menu
        as="div"
        className="absolute w-9/10 mx-auto mt-3 left-0 right-0 inline-block text-left"
      >
        <div className="item">
          <Menu.Button className="inline-flex w-full rounded-md justify-center gap-x-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-white-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <a className="img" ref={hoverRef}>
              <div className="grid__item-img-deco"></div>
              <p className="want">¿Más opciones?</p>
            </a>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="fond absolute right-0 dark bottom-full z-10 mb-2 w-full origin-bottom-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => setIsOpen(true)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    ⚙️ Configuración
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://github.com/Akicoders"
                    target="_blank"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm ",
                    )}
                  >
                    🐙 GitHub
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

type Link = {
  originalText: string
  emoji: string
  href: string
  ref: React.RefObject<HTMLParagraphElement>
  text: string
  target: string
  setText: React.Dispatch<React.SetStateAction<string>>
}

// Language switcher component
function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n()

  const toggleLang = () => {
    setLanguage(language === 'es' ? 'en' : 'es')
  }

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-2 px-3 py-1.5 text-xs rounded border border-gray-700 hover:bg-gray-800 hover:border-cyan-500 transition-all duration-200"
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      🌐 <span className="font-medium">{language.toUpperCase()}</span>
    </button>
  )
}

// Appearance toggle component (Dark/Light mode)
function AppearanceToggle() {
  const { mode, toggleMode } = useAppearance()
  const { t } = useI18n()

  return (
    <button
      onClick={toggleMode}
      className="flex items-center gap-2 px-3 py-1.5 text-xs rounded border border-gray-700 hover:bg-gray-800 hover:border-cyan-500 transition-all duration-200"
      title={mode === 'dark' ? t('theme.light') : t('theme.dark')}
    >
      {mode === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

function Sidebar() {
  const path = usePathname()
  const { t } = useI18n()
  const { mode } = useAppearance()

  // Appearance-aware colors
  const sidebarBg = mode === 'light' ? '#ffffff' : '#000000'
  const textColor = mode === 'light' ? '#1a1a1a' : '#ffffff'
  const mutedTextColor = mode === 'light' ? '#666666' : '#9e9e9e'

  const sidebarRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLDivElement>(null)

  const linksData = [
    { originalText: t('sidebar.aboutMe'), emoji: "👤", href: "/me", target: "_self" },
    { originalText: t('sidebar.skills'), emoji: "🚀", href: "/skills", target: "_self" },
    { originalText: t('sidebar.projects'), emoji: "💻", href: "/projects", target: "_self" },
    { originalText: t('sidebar.contact'), emoji: "📬", href: "/contact", target: "_self" },
  ]

  // Create a ref and a state for each link
  const links: Link[] = linksData.map((linkData) => {
    const ref = useRef<HTMLParagraphElement>(null)
    const [text, setText] = useState(linkData.originalText)
    return { ...linkData, ref, text, setText }
  })

  // Sync link text when language changes
  useEffect(() => {
    links.forEach((link, index) => {
      link.setText(linksData[index].originalText)
    })
  }, [t])

  const handleMouseOverRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth > 760) {
      handleMouseOverRef.current = (e) => {
        const link = links.find((l) => l.ref.current === e.currentTarget)
        if (link) {
          const textLength = link.text.length
          link.setText(getRandomString(textLength))
          setTimeout(() => link.setText(getRandomString(textLength)), 100)
          setTimeout(() => link.setText(getRandomString(textLength)), 200)
          setTimeout(() => link.setText(link.originalText), 400)
        }
      }

      links.forEach((link) => {
        const linkElement = link.ref.current
        if (linkElement) {
          linkElement.addEventListener("mouseover", handleMouseOverRef.current)
        }
      })

      return () => {
        links.forEach((link) => {
          const linkElement = link.ref.current
          if (linkElement) {
            linkElement.removeEventListener(
              "mouseover",
              handleMouseOverRef.current,
            )
          }
        })
      }
    }
  }, [links])

  function getRandomString(length: number) {
    let result = ""
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const [isSidebarVisible, setSidebarVisible] = React.useState(true)
  const { showConfirmation, setShowConfirmation } = useConfirmContext()

  useEffect(() => {
    const sidebar = sidebarRef.current
    if (sidebar) {
      if (isSidebarVisible) {
        gsap.to(sidebar, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
      } else {
        gsap.to(sidebar, {
          x: "-100%",
          opacity: 1,
          duration: 0.5,
          ease: "power3.inOut",
        })
      }
    }
  }, [isSidebarVisible])

  useEffect(() => {
    localStorage.setItem("visitedAt", new Date().toString())
    if (window.innerWidth <= 760) {
      setSidebarVisible(!isSidebarVisible)
    }
  }, [])

  const handleToggleRequest = () => {
    if (isSidebarVisible) {
      if (!showConfirmation) {
        setShowConfirmation(true)
        setSidebarVisible(false)
      } else {
        setSidebarVisible(false)
      }
    } else {
      setSidebarVisible(true)
    }
  }

  const texts = [
    t('sidebar.description1'),
    t('sidebar.description2'),
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleMouseEnter = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
  }

  const MobileSidebarToggle = ({ onClick }) => {
    const { mode } = useAppearance()
    return (
      <div
        className={`bar`}
        ref={toggleRef}
        style={{ backgroundColor: mode === 'light' ? '#ffffff' : '#000000' }}
      >
        <button
          onClick={onClick}
          className="mobile-sidebar-toggle mobile-toggle absolute left-0 -ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white active:opacity-50 dark:hover:text-white"
          style={{ color: mode === 'light' ? '#1a1a1a' : '#ffffff' }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-md"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    )
  }

  return (
    <>
      <MobileSidebarToggle onClick={handleToggleRequest} />

      <div
        className="sidebar flex-shrink-0 overflow-x-hidden overflow-y-scroll"
        id="sidebar"
        ref={sidebarRef}
        style={{ backgroundColor: sidebarBg, color: textColor }}
      >
        <div className="scrollbar-trigger relative h-full w-full flex-1 items-start border-white/20">
          <nav className="flex h-full w-full flex-col pb-1 justify-between">
            <div
              className="relative pr-2 pt-2 text-s font-medium text-ellipsis break-all"
              style={{ backgroundColor: sidebarBg }}
            >
              <a href="/">
                {/* Brand Title */}
                <div className="brand px-2 mt-3 mb-4">
                  <h1 className="text-2xl font-bold text-cyan-400">JP Campos</h1>
                  <p className="text-xs" style={{ color: mutedTextColor }}>Fullstack Developer</p>
                </div>
              </a>

              {/* Language and Theme Switchers */}
              <div className="px-2 mb-2 flex gap-2">
                <LanguageSwitcher />
                <AppearanceToggle />
              </div>

              <div
                className="relative pb-2 pt-3 px-2 text-s text-ellipsis break-all break-words text-justify"
                id="sideBarText"
                onMouseEnter={handleMouseEnter}
                style={{ backgroundColor: sidebarBg, color: mutedTextColor }}
              >
                {texts[currentIndex]}
              </div>
            </div>

            <div className="pb-4 pt-2 mb-6 ml-1">
              {links.map((link, index) => (
                <div key={index} className="group relative active:opacity-90">
                  <Link
                    href={link.href}
                    target={link.target}
                    className={`flex items-center gap-2 rounded-lg p-2 ${path === link.href ? "activeLink" : ""
                      }`}
                  >
                    <div
                      ref={link.ref}
                      className="relative grow overflow-hidden whitespace-nowrap"
                    >
                      <p className="itemMenu" style={{ color: textColor }}>{link.text}</p>
                      <div
                        className="absolute text-center bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent"
                        style={{ background: `linear-gradient(to left, ${sidebarBg}, transparent)` }}
                      >
                        {link.emoji}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              <BtnSide />
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar
