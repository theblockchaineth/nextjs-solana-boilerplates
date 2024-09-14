import Link from "next/link";

export default function Authorized(props) {
    return(
        <div className="flex h-1/2 w-full">
            <div className="mx-auto max-w-3xl items-center align-middle p-8 break-words text-center">
                <p className="text-3xl font-bold mb-8 text-green-700">Client-Side Session Token</p>
                <p>{JSON.stringify(props.session, null, 2)}</p>
                <p className="my-4 mt-8 text-orange-500">This page is restricted with middleware and token watching, invalidation or lack of session token will not allow you to view the page and move you back to the home page</p>
                <Link href={'/'} className="btn mt-8">GO BACK</Link>
            </div>
        </div>
    )
}