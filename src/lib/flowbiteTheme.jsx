// themes.js

const createDatePickerTheme = {
    datepicker: {
        root: {
            base: "",
        },
        popup: {
            root: {
                inner: "bg-gray-200 rounded-lg p-2"
            }
        },
        footer: {
            base: "flex mt-2 space-x-2",
            button: {
                base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium",
                today: "bg-black text-white hover:bg-cyan-800",
                clear: "border border-gray-300 bg-black text-gray-900 hover:bg-gray-100"
            }
        },
        views: {
            days: {
                items: {
                    item: {
                        base: "block flex-1 hover:bg-primary-light hover:text-white transition-all duration-200 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9",
                        selected: "bg-primary text-white",
                        disabled: "text-gray-500"
                    }
                }
            },
            months: {
                items: {
                    item: {
                        selected: "bg-primary text-white",
                        hover: "bg-primary-light hover:text-white",
                    }
                }
            },
            years: {
                items: {
                    item: {
                        selected: "bg-primary text-white",
                        hover: "bg-primary-light hover:text-white",
                    }
                }
            },
            decades: {
                items: {
                    item: {
                        selected: "bg-primary text-white",
                        hover: "bg-primary-light hover:text-white",
                    }
                }
            }
        }
    }
}

const textInputTheme = {
    textInput: {
        base: 'flex relative',
        addon: 'inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900',
        field: {
            base: 'w-full',
            icon: {
                base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
                svg: 'h-4 w-4 text-gray-500 dark:text-gray-400'
            },
            rightIcon: {
                base: 'cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3',
                svg: 'h-5 w-5 hover:text-gray-700 transition-colors duration-200 text-gray-500 dark:text-gray-400'
            },
            input: {
                base: 'block w-full focus:outline-none border disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-900',
                sizes: {
                    sm: 'p-2 sm:text-xs',
                    md: 'p-2.5 text-sm',
                    lg: 'text-sm p-3'
                },
                colors: {
                    gray: "bg-slate-100 border-gray-300 text-gray-900 transition duration-200 focus:bg-white focus:border-primary focus:ring-primary focus:ring-1",
                    info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 ",
                    failure: "border-red-500 bg-red-50 text-red-900 placeholder-red-700 ",
                    warning: "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700",
                    success: "border-green-500 bg-green-50 text-green-900 placeholder-green-700 ",
                },
                withRightIcon: {
                    on: "pr-10",
                    off: ""
                },
                withIcon: {
                    on: "pl-10",
                    off: ""
                },
                withAddon: {
                    on: "rounded-r-lg",
                    off: "rounded-lg"
                },
                withShadow: {
                    on: "shadow-sm dark:shadow-sm-light",
                    off: ""
                }
            },
        },
    },
}

const flowbiteTheme = {
    textInput: {
        base: 'flex relative',
        addon: 'inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900',
        field: {
            base: 'w-full',
            icon: {
                base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
                svg: 'h-5 w-5 text-gray-500 dark:text-gray-400'
            },
            rightIcon: {
                base: 'cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3',
                svg: 'h-5 w-5 hover:text-gray-700 transition-colors duration-200 text-gray-500 dark:text-gray-400'
            },
            input: {
                base: 'block w-full focus:outline-none border disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-900',
                sizes: {
                    sm: 'p-2 sm:text-xs',
                    md: 'p-2.5 text-sm',
                    lg: 'text-sm p-3'
                },
                colors: {
                    gray: "bg-slate-100 border-gray-300 text-gray-900 transition duration-200 focus:bg-white focus:border-primary focus:ring-primary focus:ring-1",
                    info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 ",
                    failure: "border-red-500 bg-red-50 text-red-900 placeholder-red-700 ",
                    warning: "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700",
                    success: "border-green-500 bg-green-50 text-green-900 placeholder-green-700 ",
                },
                withRightIcon: {
                    on: "pr-10",
                    off: ""
                },
                withIcon: {
                    on: "pl-10",
                    off: ""
                },
                withAddon: {
                    on: "rounded-r-lg",
                    off: "rounded-lg"
                },
                withShadow: {
                    on: "shadow-sm dark:shadow-sm-light",
                    off: ""
                }
            },
        },
    },
    datepicker: {
        root: {
            base: "relative",
        },
        popup: {
            root: {
                base: "absolute top-10 z-10 block pt-2",
                inline: "relative top-0 z-auto",
                inner: "bg-gray-100 rounded-lg p-2"
            },
            header: {
                base: "",
                title: "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
                selectors: {
                    base: "flex justify-between mb-2",
                    button: {
                        base: "text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-primary-light hover:text-white transition-colors duration-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch",
                        prev: "",
                        next: "",
                        view: ""
                    }
                }
            },
            view: {
                base: "p-1"
            },
            footer: {
                base: "flex mt-2 space-x-2",
                button: {
                    base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium",
                    today: "bg-primary text-white hover:bg-primary-light transition-colors duration-200",
                    clear: "border border-gray-300 text-gray-900 hover:bg-gray-100"
                }
            },
        },
        views: {
            days: {
                header: {
                    base: "grid grid-cols-7 mb-1",
                    title: "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400"
                },
                items: {
                    base: "grid w-64 grid-cols-7",
                    item: {
                        base: "block flex-1 hover:bg-primary-light hover:text-white transition-all duration-200 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9",
                        selected: "bg-primary text-white hover:bg-primary-dark",
                        hover: "bg-primary-light text-white",
                        disabled: "text-gray-500"
                    }
                }
            },
            months: {
                items: {
                    base: "grid w-64 grid-cols-4",
                    item: {
                        base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                        selected: "bg-primary text-white",
                        hover: "bg-primary-light hover:text-white",
                        disabled: "text-gray-500"
                    }
                }
            },
            years: {
                items: {
                    base: "grid w-64 grid-cols-4",
                    item: {
                        base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
                        selected: "bg-primary text-white",
                        hover: "bg-primary-light hover:text-white",
                        disabled: "text-gray-500"
                    }
                }
            },
            decades: {
                items: {
                    base: "grid w-64 grid-cols-4",
                    item: {
                        base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
                        selected: "bg-primary text-white",
                        hover: "bg-primary-light hover:text-white",
                        disabled: "text-gray-500"
                    }
                }
            }
        }
    },
    textarea: {
        base: "block w-full rounded-lg focus:outline-none border disabled:bg-gray-200 disabled:cursor-not-allowed text-sm",
        colors: {
            gray: "bg-slate-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary focus:bg-white focus:ring-primary ring-1 ring-transparent transition-all duration-200",
            info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
            failure: "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
            warning: "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
            success: "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
        },
        withShadow: {
            on: "shadow-sm dark:shadow-sm-light",
            off: ""
        }
    },
    button: {
        "base": "group flex items-stretch items-center justify-center p-0.5 text-center font-medium focus:outline-none",
        "fullSized": "w-full",
        "color": {
            "primary": "text-primary border border-primary enabled:hover:text-white enabled:hover:bg-primary-light focus:ring-primary active:scale-90 transition-all duration-200",
            "primary2": "text-white bg-primary border border-primary enabled:hover:bg-primary-dark focus:ring-primary active:scale-90 transition-all duration-100",
            "dark": "text-white bg-gray-800 border border-transparent enabled:hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:enabled:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700",
            "failure": "text-white bg-red-700 border border-transparent enabled:hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:enabled:hover:bg-red-700 dark:focus:ring-red-900",
            "gray": "active:scale-95 text-gray-900 bg-white border border-gray-200 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 focus:ring-4 focus:ring-gray-200 transtion-all duration-200",
            "gray-purple": "bg-gray-200 text-gray-500 border border-gray-500 hover:bg-purple/50 hover:text-white active:scale-90 transtion-all duration-200 ",
            "info": "text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800",
            "light": "text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:enabled:hover:bg-gray-700 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-700",
            "purple": "text-white bg-purple border border-transparent enabled:hover:bg-purple-dark focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:enabled:hover:bg-purple-700 dark:focus:ring-purple-900 transtion-colors duration-200",
            "success": "text-white bg-green-700 border border-transparent enabled:hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800",
            "warning": "text-white bg-yellow-400 border border-transparent enabled:hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900",
            "blue": "text-white bg-blue-700 border border-transparent enabled:hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
            "cyan": "text-cyan-900 bg-white border border-cyan-300 enabled:hover:bg-cyan-100 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:text-white dark:border-cyan-600 dark:enabled:hover:bg-cyan-700 dark:enabled:hover:border-cyan-700 dark:focus:ring-cyan-700",
            "green": "text-white bg-green border border-green-300 enabled:hover:bg-green-dark focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:text-white dark:border-green-600 dark:enabled:hover:bg-green-700 dark:enabled:hover:border-green-700 dark:focus:ring-green-700 transtion-colors duration-200",
            "green-dark": "text-white bg-green dark bg-green-dark border border-green-300 enabled:hover:bg-green-dark dark:enabled:hover:bg-green-dark focus:ring-4 focus:ring-green-300 dark:focus:ring-green-700",
            "indigo": "text-indigo-900 bg-white border border-indigo-300 enabled:hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:text-white dark:border-indigo-600 dark:enabled:hover:bg-indigo-700 dark:enabled:hover:border-indigo-700 dark:focus:ring-indigo-700",
            "lime": "text-lime-900 bg-white border border-lime-300 enabled:hover:bg-lime-100 focus:ring-4 focus:ring-lime-300 dark:bg-lime-600 dark:text-white dark:border-lime-600 dark:enabled:hover:bg-lime-700 dark:enabled:hover:border-lime-700 dark:focus:ring-lime-700",
            "pink": "text-pink-900 bg-white border border-pink-300 enabled:hover:bg-pink-100 focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:text-white dark:border-pink-600 dark:enabled:hover:bg-pink-700 dark:enabled:hover:border-pink-700 dark:focus:ring-pink-700",
            "red": "text-white bg-red border border-red-dark enabled:hover:bg-red-dark focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:text-white dark:border-red-600 dark:enabled:hover:bg-red-700 dark:enabled:hover:border-red-700 dark:focus:ring-red-700 transtion-colors duration-200",
            "teal": "text-teal-900 bg-white border border-teal-300 enabled:hover:bg-teal-100 focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:text-white dark:border-teal-600 dark:enabled:hover:bg-teal-700 dark:enabled:hover:border-teal-700 dark:focus:ring-teal-700",
            "yellow": "text-yellow-900 bg-white border border-yellow-300 enabled:hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:text-white dark:border-yellow-600 dark:enabled:hover:bg-yellow-700 dark:enabled:hover:border-yellow-700 dark:focus:ring-yellow-700"
        },
        "disabled": "cursor-not-allowed opacity-50",
        "isProcessing": "cursor-wait",
        "spinnerSlot": "absolute h-full top-0 flex items-center animate-fade-in",
        "spinnerLeftPosition": {
            "xs": "left-2",
            "sm": "left-3",
            "md": "left-4",
            "lg": "left-5",
            "xl": "left-6"
        },
        "gradient": {
            "cyan": "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
            "failure": "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800",
            "info": "text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 ",
            "lime": "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800",
            "pink": "text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800",
            "purple": "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800",
            "success": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800",
            "teal": "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800"
        },
        "gradientDuoTone": {
            "cyanToBlue": "text-white bg-gradient-to-r from-cyan-500 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
            "greenToBlue": "text-white bg-gradient-to-br from-green-400 to-cyan-600 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800",
            "pinkToOrange": "text-white bg-gradient-to-br from-pink-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800",
            "purpleToBlue": "text-white bg-gradient-to-br from-purple-600 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
            "purpleToPink": "text-white bg-gradient-to-r from-purple-500 to-pink-500 enabled:hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800",
            "redToYellow": "text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400",
            "tealToLime": "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 enabled:hover:bg-gradient-to-l enabled:hover:from-teal-200 enabled:hover:to-lime-200 enabled:hover:text-gray-900 focus:ring-4 focus:ring-lime-200 dark:focus:ring-teal-700"
        },
        "inner": {
            "base": "flex items-stretch items-center transition-all duration-200",
            "position": {
                "none": "",
                "start": "rounded-r-none",
                "middle": "rounded-none",
                "end": "rounded-l-none"
            },
            "outline": "border border-transparent",
            "isProcessingPadding": {
                "xs": "pl-8",
                "sm": "pl-10",
                "md": "pl-12",
                "lg": "pl-16",
                "xl": "pl-20"
            }
        },
        "label": "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
        "outline": {
            "color": {
                "gray": "border border-gray-900 dark:border-white",
                "default": "border-0",
                "light": ""
            },
            "off": "",
            "on": "flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full",
            "pill": {
                "off": "rounded-md",
                "on": "rounded-full"
            }
        },
        "pill": {
            "off": "rounded-lg",
            "on": "rounded-full"
        },
        "size": {
            "xs": "text-xs px-2 py-1",
            "sm": "text-sm px-3 py-1.5",
            "md": "text-sm px-4 py-2",
            "lg": "text-base px-5 py-2.5",
            "xl": "text-base px-6 py-3"
        }
    },
    dropdown: {
        arrowIcon: "ml-2 h-4 w-4",
        content: "py-1 focus:outline-none",
        floating: {
            animation: "transition-opacity",
            arrow: {
                base: "absolute z-10 h-2 w-2 rotate-45",
                style: {
                    dark: "bg-gray-900 dark:bg-gray-700",
                    light: "bg-white",
                    auto: "bg-white dark:bg-gray-700"
                },
                placement: "-4px"
            },
            base: "z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none",
            content: "py-1 text-sm text-gray-700 dark:text-gray-200",
            divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
            header: "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200",
            hidden: "invisible opacity-0",
            item: {
                container: "",
                base: "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
                icon: "mr-2 h-4 w-4"
            },
            style: {
                dark: "bg-gray-900 text-white dark:bg-gray-700",
                light: "border  border-gray-200 bg-white text-gray-900",
                auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
            },
            target: "w-fit "
        },
        inlineWrapper: "flex items-center"
    }
}


export { createDatePickerTheme, textInputTheme, flowbiteTheme };
