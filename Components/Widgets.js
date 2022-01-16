import { SearchIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import Contact from "./Contact";

const contacts = [
    {
        src: 'https://links.papareact.com/f0p',
        name: 'Jeff Bezos'
    },
    {
        src: 'https://links.papareact.com/kxk',
        name: 'Elon Musk'
    },
    {
        src: 'https://links.papareact.com/zvy',
        name: 'Bill Gates'
    },
    {
        src: 'https://links.papareact.com/snf',
        name: 'Mark Zuckerburg'
    },
    {
        src: 'https://links.papareact.com/d0c',
        name: 'Harry Potter'
    },
    {
        src: 'https://links.papareact.com/6gg',
        name: 'The Queen'
    },
    {
        src: 'https://links.papareact.com/r57',
        name: 'James Bond'
    }
];

function Widgets() {
    return (
        <div className="hidden lg:flex flex-col w-60 mt-5" key='widget'>
            <div className="flex justify-center items-center text-gray-500 mb-5">
                <h2 className="text-xl">Contacts</h2>
                <div className="flex space-x-2">
                    <VideoCameraIcon className="h-6" />
                    <SearchIcon className="h-6" />
                    <DotsHorizontalIcon className="h-6" />
                </div>
            </div>

            {
                <span>
                    {
                        contacts.map((contact) => {
                            return (
                                <Contact key={contact.src} src={contact.src} name={contact.name} />
                            )
                        })
                    }
                </span>
            }
        </div>
    )
}

export default Widgets
