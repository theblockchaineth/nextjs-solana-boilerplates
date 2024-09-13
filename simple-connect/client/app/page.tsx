import UserDetails from "@/app/_components/UserDetails"

export default function Home() {

  return (
    <main className="flex w-screen h-full">
      <div className="mt-12 mx-auto max-w-xl w-full">
        <div className="hero bg-base-200 min-h-96 rounded-lg w-full border-2">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <UserDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
