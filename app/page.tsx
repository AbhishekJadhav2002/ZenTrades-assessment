import Link from "next/link";

export default function Home(): JSX.Element {
  return (
    <main className="flex min-h-screen max-w-screen overflow-hidden flex-col items-center justify-between p-16 lg:p-24 gap-y-12 lg:gap-y-32">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <div className="relative flex flex-wrap justify-center items-end gap-4">
          <h1 className="text-2xl sm:text-4xl font-bold dark:drop-shadow-[0_0_0.3rem_#ffffff70] text-center">
            ZenTrades Assessment
          </h1>
          <span className="text-sm sm:text-lg">
            <span className="text-normal font-medium text-gray-500 dark:text-gray-400 mr-1">
              By
            </span>
            <Link
              href="https://github.com/AbhishekJadhav2002"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Abhishek Jadhav
            </Link>
          </span>
        </div>
      </div>

      <div className="grid lg:max-w-full lg:w-full lg:mb-16 lg:grid-cols-3 lg:text-left">
        <Link
          href="/1"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-normal sm:text-2xl font-semibold`}>
            Task 1{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <ol
            role="list"
            className={`text-sm opacity-50 marker:text-[#0141ff] marker:opacity-40 list-disc pl-5 space-y-3`}
          >
            <li>
              Fetch the JSON file programmatically and store the data in the
              data structure of your choice.
            </li>
            <li>
              Display the data in the presentation of your choice with Title,
              Price ordered based on the descending popularity.
            </li>
          </ol>
        </Link>

        <Link
          href="/2"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-normal sm:text-2xl font-semibold`}>
            Task 2{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <ol
            role="list"
            className={`text-sm opacity-50 marker:text-[#0141ff] marker:opacity-40 list-disc pl-5 space-y-3`}
          >
            <li>
              Download the JSON file create the following UI to import the data
              on the browser and display the data.
            </li>
            <li>
              The display handling option controls the display of columns in the
              table in which data is displayed. It allows a multi-select
              functionality and clicking on the “{">>"}” and “{"<<"}” buttons
              adds and removes the selected option from the Available Fields
              List to Fields to be displayed List and Vice Versa.
            </li>
            <li>
              Display the data in table format of your choice with Title, Price
              ordered based on the descending popularity.
            </li>
          </ol>
        </Link>

        <Link
          href="/3"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-normal sm:text-2xl font-semibold`}>
            Task 3{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <ol
            role="list"
            className={`text-sm opacity-50 marker:text-[#0141ff] marker:opacity-40 list-disc pl-5 space-y-3`}
          >
            <li>
              The user name field should only accept an email format. The
              validation should happen through Javascript.
            </li>
            <li>
              The password field must be a masked field i.e. should not reveal
              what&apos;s being entered.
            </li>
            <li>
              The password field should not accept any special character other
              than @ and must contain an uppercase letter and a number.
            </li>
          </ol>
        </Link>

        <Link
          href="/4"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-normal sm:text-2xl font-semibold`}>
            Task 4{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <ol
            role="list"
            className={`text-sm opacity-50 marker:text-[#0141ff] marker:opacity-40 list-disc pl-5 space-y-3`}
          >
            <li>
              The user name field should only accept an email format. The
              validation should happen through Javascript.
            </li>
            <li>
              The password field must be a masked field i.e. should not reveal
              what&apos;s being entered.
            </li>
            <li>
              The password field should not accept any special character other
              than @ and must contain an uppercase letter and a number.
            </li>
            <li>
              Entering the password as - SmartServTest@123 should redirect the
              user to a dashboard page which must look like below. (file :
              dashboard2.png). Any other password should throw an error.
            </li>
            <li>
              Clicking on the Forgot your password link should open any email
              client to send an email to support@smartserv.io for resetting the
              password.
            </li>
            <li>
              All the components on the dashboard page must be actual components
              like charts and dropdowns. No image use is allowed.
            </li>
          </ol>
        </Link>
      </div>
    </main>
  );
}
