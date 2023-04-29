import React, { useState } from 'react';
import { SignedIn, UserButton, useAuth, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
// import { atom } from 'jotai';
// export const drawerAtom = atom(false);

export const Drawer = ({ setOpen }: any) => {
  const { user } = useUser();
  const router = useRouter();
  const { mutateAsync } = api.room.leave.useMutation({
    onSuccess: () => router.push('/hello'),
  });
  const [leave, setLeave] = useState(false);
  return (
    <div className="absolute  right-0 top-0 z-[40] flex h-screen w-[70vw] flex-col justify-between bg-black px-8 py-[10vh] font-gilroy font-semibold sm:w-[40vw] sm:px-12 lg:w-[25vw]">
      <div className="flex w-full flex-col gap-y-[10vh] ">
        <TopRightNav />
        <div className="flex flex-col gap-[3vh] text-left">
          <Link
            href="/dash"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="flex gap-6 py-2"
          >
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9202 9.91319V25.8239L0.513428 20.6962V4.7998L17.9202 9.91319Z"
                fill="#E0E0E0"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.94666 17.508V6.71069L16.487 10.9968V21.787L1.94666 17.508Z"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.1619 8.08032V23.991L17.92 25.8381V9.92742L24.1619 8.08032Z"
                fill="#06C270"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.76238 2.95215L24.1621 8.0798L17.9202 9.9269L0.513428 4.79925L6.76238 2.95215Z"
                fill="#E0E0E0"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.5535 21.2236L8.02379 20.5104C7.94142 20.4831 7.8537 20.4758 7.76792 20.4891C7.68213 20.5024 7.60071 20.536 7.53059 20.5869C7.46046 20.6378 7.4036 20.7047 7.36473 20.782C7.32585 20.8592 7.30615 20.9446 7.30717 21.031C7.3057 21.2023 7.36105 21.3692 7.46472 21.5059C7.56838 21.6426 7.71452 21.7414 7.88041 21.787L10.4101 22.5001C10.4925 22.5274 10.5802 22.5347 10.666 22.5214C10.7518 22.5081 10.8332 22.4746 10.9033 22.4237C10.9735 22.3727 11.0303 22.3058 11.0692 22.2286C11.1081 22.1513 11.1278 22.0659 11.1267 21.9795C11.127 21.8086 11.0712 21.6422 10.9677 21.5057C10.8642 21.3693 10.7188 21.2702 10.5535 21.2236Z"
                fill="#06C270"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.14853 0.22119C9.14853 0.142741 8.96222 0.142741 8.80456 0.22119C8.64691 0.299638 8.53944 0.399476 8.56811 0.477924L10.7609 5.61271L11.3343 5.36311L9.14853 0.22119Z"
                fill="#E0E0E0"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.4015 6.34757C14.4015 6.74695 13.3122 7.06074 11.9721 7.06074C10.632 7.06074 9.54272 6.73981 9.54272 6.34757C9.54272 5.95533 10.632 5.04248 11.9721 5.04248C13.3122 5.04248 14.4015 5.96246 14.4015 6.34757Z"
                fill="#06C270"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.3217 1.73994L13.2975 6.25428C13.2545 6.31846 13.0969 6.29707 12.9536 6.19722C12.8102 6.09738 12.7314 5.97614 12.7744 5.90482L15.7986 1.39049C15.8416 1.32631 15.9992 1.3477 16.1425 1.44754C16.2858 1.54739 16.3647 1.66863 16.3217 1.73994Z"
                fill="#E0E0E0"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p> dashboard</p>
          </Link>
          <div className="flex gap-6 py-2">
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3378 16.459L24.1621 19.9608L12.3378 23.4411L0.513428 19.9608L12.3378 16.459Z"
                fill="#E0E0E0"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.1621 19.9614V22.4077L12.3378 25.8381V23.4418L24.1621 19.9614Z"
                fill="#06C270"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.3378 23.4418V25.8381L0.513428 22.3506V19.9614L12.3378 23.4418Z"
                fill="#E0E0E0"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.5863 19.9544L16.738 13.6641H15.0611L11.22 19.9544C11.22 20.04 11.4422 20.1042 11.7073 20.1042C11.9725 20.1042 12.1445 20.0471 12.1803 19.9758L15.9067 14.0634L19.6332 19.9758C19.6332 20.0471 19.8625 20.1042 20.1061 20.1042C20.3498 20.1042 20.5935 20.04 20.5935 19.9544H20.5863Z"
                fill="#E0E0E0"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.3352 2.08161C18.4289 -0.714096 13.0901 -0.421683 8.41049 2.73775C3.73092 5.89719 1.49505 10.7326 3.39411 13.5355C5.29317 16.3383 10.6464 16.0388 15.3188 12.8793C19.9912 9.71989 22.2485 4.88446 20.3352 2.08161Z"
                fill="#E0E0E0"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.7722 10.7385L13.1824 12.4907L14.242 14.0419L16.8318 12.2896L15.7722 10.7385Z"
                fill="#8A8A8A"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.0983 12.5326C15.8152 12.0478 16.1584 11.3061 15.8647 10.8761C15.5711 10.4461 14.7518 10.4905 14.0349 10.9754C13.3181 11.4602 12.975 12.2019 13.2686 12.6319C13.5623 13.0619 14.3815 13.0175 15.0983 12.5326Z"
                fill="#06C270"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.3353 2.08105C22.2487 4.8839 20.0128 9.7122 15.3189 12.8788C10.6251 16.0453 5.28618 16.3306 3.39429 13.5349C5.30768 16.3306 11.4205 17.2863 16.1 14.1197C20.7796 10.9532 22.2487 4.8839 20.3353 2.08105Z"
                fill="#06C270"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.0034 11.2745L10.159 4.21387L9.2345 4.83434L14.0789 11.9021C14.1792 12.059 14.4731 12.0376 14.731 11.9021C14.989 11.7666 15.1037 11.4314 15.0034 11.2745Z"
                fill="#06C270"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.1591 4.21395C10.0516 4.05705 9.76495 4.07132 9.50696 4.21395C9.24898 4.35659 9.12715 4.649 9.23464 4.79877C9.34214 4.94854 9.62881 4.93428 9.88679 4.79877C10.1448 4.66326 10.2594 4.36372 10.1591 4.21395Z"
                fill="#E0E0E0"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.23501 4.84204L5.31506 15.1263"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.1589 4.21387L21.0803 4.44263"
                stroke="#3D3D3D"
                strokeWidth="0.27027"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>live match</p>
          </div>
          <Link
            href="/leaderboard"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="flex gap-6 py-2"
          >
            <svg
              width="24"
              height="26"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.67969 21.0221L7.58285 1.72876L23.3503 6.12608L17.3681 25.7761L1.67969 21.0221Z"
                fill="#06C270"
                stroke="#3D3D3D"
                strokeWidth="0.279999"
                strokeLinejoin="round"
              />
              <path
                d="M0.649536 19.517L6.55269 0.223633L22.3201 4.62095L16.338 24.2709L0.649536 19.517Z"
                fill="#E0E0E0"
                stroke="#3D3D3D"
                strokeWidth="0.279999"
                strokeLinejoin="round"
              />
              <path
                d="M4.70947 13.2446L16.3965 16.5724"
                stroke="#3D3D3D"
                strokeWidth="0.279999"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.23389 14.9084L15.9209 18.2362"
                stroke="#3D3D3D"
                strokeWidth="0.279999"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.59998 16.5725L15.287 19.9002"
                stroke="#3D3D3D"
                strokeWidth="0.279999"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.43225 8.10034L18.1193 11.4281"
                stroke="#3D3D3D"
                strokeWidth="0.279999"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.95703 9.76392L17.6441 13.0916"
                stroke="#3D3D3D"
                strokeWidth="0.279999"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.32288 11.4277L17.0099 14.7555"
                stroke="#3D3D3D"
                strokeWidth="0.279999"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.83215 3.20044L19.5192 6.52816"
                stroke="#3D3D3D"
                strokeWidth="0.279999"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.35693 4.86401L19.044 8.19174"
                stroke="#3D3D3D"
                strokeWidth="0.279999"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.7229 6.52759L18.4099 9.85531"
                stroke="#3D3D3D"
                strokeWidth="0.279999"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.64974 1.88277L8.07988 2.46987L7.27314 2.33329L7.65545 3.05666L7.27626 3.78167L8.08241 3.64163L8.65479 4.22628L8.77071 3.41637L9.50365 3.0527L8.76914 2.69218L8.64974 1.88277Z"
                fill="#FFF066"
                stroke="#161616"
                strokeWidth="0.207199"
                strokeLinejoin="round"
              />
              <path
                d="M16.1439 8.38412L17.7453 3.35107L20.8465 4.22147L19.2705 9.29914L18.0758 7.49438L16.1439 8.38412Z"
                fill="#06C270"
                stroke="#3D3D3D"
                strokeWidth="0.179655"
                strokeLinejoin="round"
              />
            </svg>
            <p>Leaderboard</p>
          </Link>
        </div>
      </div>
      <div className=' gap-y-[1vh]" flex w-full  flex-col'>
        <span
          onClick={async () => {
            const roomId = (await user?.publicMetadata.room) as string;
            navigator.clipboard.writeText(
              `https://${document.location.host}/hello?inv=${Buffer.from(
                roomId
              ).toString('base64')}`
            );
          }}
          className="flex gap-6 py-2 "
        >
          <svg
            width="26"
            height="28"
            viewBox="0 0 26 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.6779 3.77593L13.6976 0.810308C12.3521 0.366002 10.9048 1.11686 10.4933 2.47266L4.87656 20.9767C4.48087 22.2802 5.19187 23.6624 6.48246 24.0986L15.5475 27.1622C16.9016 27.6198 18.3651 26.8618 18.7725 25.4918L24.3045 6.88979C24.6932 5.58279 23.9727 4.20352 22.6779 3.77593Z"
              fill="#1FC87F"
            />
            <path
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M15.8124 25.1538C16.4867 25.3723 17.2086 24.9922 17.4101 24.3126L22.2833 7.87666C22.514 7.09855 22.0898 6.27698 21.3219 6.01451L7.83496 1.40526C7.01797 1.12604 6.13332 1.58587 5.89241 2.41496L1.04818 19.0861C0.858021 19.7405 1.22221 20.4276 1.87055 20.6376L15.8124 25.1538Z"
              fill="#0D0D0D"
            />
            <path
              d="M8.39093 2.6514L3.47708 19.3894C3.25031 20.1619 3.66803 20.9767 4.4276 21.2435L14.6278 24.8261C15.4425 25.1122 16.3311 24.6598 16.5789 23.8326L21.6197 7.00524C21.8536 6.22445 21.427 5.39868 20.6549 5.13751L10.3278 1.64418C9.5133 1.36865 8.63315 1.82634 8.39093 2.6514Z"
              fill="white"
              stroke="#0D0D0D"
              strokeWidth="0.504427"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[#06C270]">copy room invite</p>
        </span>
        <span className="flex gap-6 py-2">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.2882 5.85561L24.5387 4.53063C24.3462 4.23369 24.0591 4.01462 23.7267 3.91088L21.4989 3.23415L17.2584 1.93766L15.0306 1.22531C14.8469 1.16856 14.6542 1.14976 14.4634 1.16999C14.2727 1.19021 14.0877 1.24906 13.9193 1.34313C13.7508 1.4372 13.6022 1.56463 13.4821 1.71803C13.3619 1.87144 13.2725 2.04778 13.2192 2.23685L7.77112 21.0074C7.67006 21.3566 7.69721 21.7317 7.84746 22.0617L8.58316 23.3724C8.67585 23.5445 8.80083 23.6961 8.95093 23.8184C9.10102 23.9407 9.27326 24.0312 9.45763 24.0848L18.1814 26.7775C18.5514 26.8884 18.949 26.8452 19.2881 26.6571C19.6272 26.4691 19.8804 26.1514 19.9928 25.773L25.4132 7.04524C25.4776 6.84951 25.4998 6.64173 25.4782 6.43631C25.4567 6.23089 25.3918 6.03274 25.2882 5.85561Z"
              fill="#EE4D37"
              stroke="#3D3D3D"
              strokeWidth="0.283784"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24.5389 4.53063C24.3509 4.23385 24.0651 4.0164 23.7339 3.918L21.4991 3.20565L17.2587 1.90204L15.0308 1.22531C14.8472 1.16856 14.6544 1.14976 14.4637 1.16999C14.2729 1.19021 14.088 1.24906 13.9195 1.34313C13.7511 1.4372 13.6025 1.56463 13.4823 1.71803C13.3621 1.87144 13.2727 2.04778 13.2194 2.23685L12.4768 4.78708L8.22249 19.4687L7.78526 20.9718C7.7279 21.1598 7.70783 21.3576 7.72621 21.5537C7.74458 21.7498 7.80104 21.9401 7.89226 22.1134C7.98347 22.2867 8.10753 22.4395 8.25723 22.5627C8.40693 22.686 8.57924 22.7772 8.76385 22.831L17.4599 25.4952C17.8308 25.6083 18.2302 25.5662 18.5709 25.378C18.9116 25.1898 19.1659 24.8708 19.2782 24.4908L24.7055 5.74163C24.7638 5.5393 24.779 5.32649 24.7503 5.11757C24.7216 4.90866 24.6495 4.7085 24.5389 4.53063Z"
              fill="#E0E0E0"
              stroke="#3D3D3D"
              strokeWidth="0.283784"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24.5392 6.34008L13.067 2.82104"
              stroke="#3D3D3D"
              strokeWidth="0.283784"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.7435 3.79752L18.2653 3.34106"
              stroke="#3D3D3D"
              strokeWidth="0.283784"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.7227 23.0092L8.22974 19.5044"
              stroke="#3D3D3D"
              strokeWidth="0.283784"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.8907 14.1687C16.4013 16.039 15.225 17.6418 13.6086 18.6407C11.9923 19.6395 10.0618 19.9567 8.22241 19.5256L12.4768 4.84399C14.2447 5.5104 15.6923 6.85413 16.5153 8.59292C17.3384 10.3317 17.473 12.3302 16.8907 14.1687Z"
              fill="#3D3D3D"
              stroke="#3D3D3D"
              strokeWidth="0.283784"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.651 4.05307C10.266 3.54734 8.76509 3.47952 7.34217 3.85837C5.91924 4.23722 4.63968 5.04533 3.66882 6.1783C2.69796 7.31126 2.08044 8.71703 1.89598 10.214C1.71153 11.7109 1.96868 13.2302 2.63414 14.5756C3.29961 15.921 4.34283 17.0306 5.62906 17.7612C6.91528 18.4917 8.38539 18.8096 9.84944 18.6737C11.3135 18.5379 12.7042 17.9545 13.8419 16.999C14.9796 16.0435 15.8119 14.7598 16.2315 13.3137C16.8204 11.4622 16.6687 9.44641 15.8097 7.70975C14.9507 5.97309 13.4548 4.65776 11.651 4.05307Z"
              fill="#E0E0E0"
              stroke="#3D3D3D"
              strokeWidth="0.277027"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.1163 11.2414L9.98559 10.586L11.8248 7.4873L7.0083 11.3198L9.14586 11.9751L7.30668 15.0739L12.1163 11.2414Z"
              fill="#EE4D37"
              stroke="#3D3D3D"
              strokeWidth="0.277027"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p onClick={() => setLeave(!leave)} className="text-[#EE4D37]">
            leave room
          </p>
        </span>
        {leave && (
          <p
            onClick={(e) => {
              e.stopPropagation();
              mutateAsync();
            }}
            className="font-bold text-[#EE4D37]"
          >
            Confirm leave?
          </p>
        )}
      </div>
    </div>
  );
};

const TopRightNav = () => {
  const { user } = useUser();
  return (
    <div className="justify-left flex w-full items-center gap-6">
      <div className="flex h-12 w-12 items-center">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            layout: {
              logoPlacement: 'none',
            },
            elements: {
              userButtonAvatarBox: 'h-8 w-8 sm:h-12 sm:w-12',
            },
          }}
        />
      </div>
      <p>{user?.publicMetadata?.username as string}</p>
    </div>
  );
};

export const LayoutHelper = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center gap-4 overflow-hidden pb-8 pl-8  pr-4 pt-4 sm:pl-12  sm:pr-6 sm:pt-10">
      {/* Header */}
      {['/', '/hello', '/dash'].includes(router?.pathname) && (
        <div className=" flex h-16 w-full items-center justify-between  ">
          <Link href={userId ? '/dash' : '/'}>
            <svg
              className="w-24 sm:w-[10rem]"
              viewBox="0 0 201 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.072 16.1475L26.4158 17.6969C25.4498 20.8325 23.8151 22.7508 21.5116 23.4517C19.2081 24.1526 16.1615 23.4148 12.3719 21.2383C9.51116 19.6152 7.43059 19.0065 6.13024 19.4123C4.86704 19.8181 3.93822 21.0907 3.34377 23.2303L0 21.681C0.965977 18.5823 2.61928 16.6824 4.95992 15.9815C7.33771 15.2806 10.3657 16 14.0438 18.1396C15.9015 19.2832 17.4433 19.9287 18.6694 20.0763C19.9326 20.1869 20.88 19.9287 21.5116 19.3016C22.1432 18.6376 22.6633 17.5862 23.072 16.1475Z"
                fill="white"
              />
              <path
                d="M57.232 17.8076C60.2718 18.9344 62.5213 20.3026 63.9804 21.9124C65.4395 23.4818 66.169 25.6349 66.169 28.3714C66.169 32.4762 64.9328 35.3536 62.4605 37.0035C59.9881 38.6535 56.7254 39.4785 52.6724 39.4785C49.2678 39.4785 46.3901 38.895 44.0394 37.7279C41.7291 36.5609 39.9863 35.092 38.8109 33.3213V21.5502H39.5405C39.6621 24.6891 40.2498 27.4458 41.3035 29.8201C42.3979 32.1945 43.938 34.0457 45.924 35.3737C47.91 36.6615 50.2203 37.3054 52.8547 37.3054C55.7324 37.3054 57.9616 36.6011 59.5423 35.1926C61.123 33.7438 61.9133 31.8725 61.9133 29.5787C61.9133 27.7677 61.4067 26.2385 60.3934 24.991C59.4207 23.7032 57.8603 22.677 55.7121 21.9124L47.0184 18.8338C44.6271 18.0289 42.8234 16.9222 41.6075 15.5137C40.3916 14.1052 39.7837 12.2138 39.7837 9.83944C39.7837 8.10898 40.2498 6.49926 41.182 5.01027C42.1547 3.52127 43.6138 2.31398 45.5593 1.38839C47.5452 0.462796 49.9771 0 52.8547 0C55.2055 0 57.3739 0.342066 59.3599 1.0262C61.3864 1.71033 63.1292 2.71641 64.5883 4.04443L65.0747 14.4272H64.2843C63.6764 10.2821 62.4402 7.18339 60.5758 5.13099C58.7519 3.0786 56.1782 2.0524 52.8547 2.0524C49.9771 2.0524 47.7682 2.71641 46.228 4.04443C44.7284 5.33221 43.9786 7.0023 43.9786 9.0547C43.9786 10.3425 44.3433 11.4693 45.0729 12.4351C45.8024 13.401 46.9778 14.1656 48.599 14.729L57.232 17.8076Z"
                fill="white"
              />
              <path
                d="M85.2233 1.44875H86.3784L76.5295 34.5286C76.1242 35.8968 76.3269 36.8426 77.1375 37.3657C77.9481 37.8889 79.164 38.1505 80.7852 38.1505V39.0559H68.0789V38.1505C69.2948 38.1505 70.4094 37.8889 71.4227 37.3657C72.4359 36.8023 73.1452 35.8566 73.5505 34.5286L82.3659 5.13099C82.7712 3.72249 82.4267 2.77677 81.3324 2.29386C80.2786 1.7707 78.7992 1.50911 76.8943 1.50911V0.603646H89.175L99.2671 34.5286C99.6724 35.8566 100.361 36.8023 101.334 37.3657C102.347 37.8889 103.462 38.1505 104.678 38.1505V39.0559H90.6949V38.1505C92.3162 38.1505 93.5523 37.8889 94.4035 37.3657C95.2546 36.8426 95.4775 35.8968 95.0722 34.5286L85.2233 1.44875ZM77.2591 24.6288H95.741V27.1641H77.2591V24.6288Z"
                fill="white"
              />
              <path
                d="M118.724 34.3475C118.724 35.756 119.13 36.742 119.94 37.3054C120.751 37.8688 121.784 38.1505 123.041 38.1505V39.0559H110.213V38.1505C111.469 38.1505 112.503 37.8688 113.313 37.3054C114.124 36.742 114.529 35.756 114.529 34.3475V0.603646H118.724V34.3475ZM100.729 0.0603639C101.175 0.261579 101.742 0.402429 102.431 0.482915C103.16 0.563402 104.072 0.603646 105.167 0.603646H128.148C129.242 0.603646 130.134 0.563402 130.823 0.482915C131.512 0.402429 132.099 0.261579 132.586 0.0603639L132.829 2.23349L133.498 8.51141L132.586 8.63214C132.424 7.06266 131.998 5.75476 131.309 4.70844C130.66 3.66212 129.607 3.13896 128.148 3.13896H105.106C103.687 3.13896 102.634 3.66212 101.945 4.70844C101.256 5.71452 100.83 7.0023 100.668 8.57178L99.7559 8.51141L100.485 2.23349L100.729 0.0603639Z"
                fill="white"
              />
              <path
                d="M152.369 34.3475C152.369 35.756 152.774 36.742 153.585 37.3054C154.396 37.8688 155.429 38.1505 156.686 38.1505V39.0559H143.858V38.1505C145.114 38.1505 146.148 37.8688 146.958 37.3054C147.769 36.742 148.174 35.756 148.174 34.3475V0.603646H152.369V34.3475ZM134.373 0.0603639C134.819 0.261579 135.387 0.402429 136.076 0.482915C136.805 0.563402 137.717 0.603646 138.812 0.603646H161.792C162.887 0.603646 163.778 0.563402 164.467 0.482915C165.156 0.402429 165.744 0.261579 166.23 0.0603639L166.474 2.23349L167.142 8.51141L166.23 8.63214C166.068 7.06266 165.643 5.75476 164.954 4.70844C164.305 3.66212 163.251 3.13896 161.792 3.13896H138.751C137.332 3.13896 136.278 3.66212 135.589 4.70844C134.9 5.71452 134.475 7.0023 134.313 8.57178L133.401 8.51141L134.13 2.23349L134.373 0.0603639Z"
                fill="white"
              />
              <path
                d="M181.527 1.44875H182.682L172.833 34.5286C172.428 35.8968 172.63 36.8426 173.441 37.3657C174.252 37.8889 175.468 38.1505 177.089 38.1505V39.0559H164.382V38.1505C165.598 38.1505 166.713 37.8889 167.726 37.3657C168.739 36.8023 169.449 35.8566 169.854 34.5286L178.669 5.13099C179.075 3.72249 178.73 2.77677 177.636 2.29386C176.582 1.7707 175.103 1.50911 173.198 1.50911V0.603646H185.479L195.571 34.5286C195.976 35.8566 196.665 36.8023 197.638 37.3657C198.651 37.8889 199.766 38.1505 200.981 38.1505V39.0559H186.998V38.1505C188.62 38.1505 189.856 37.8889 190.707 37.3657C191.558 36.8426 191.781 35.8968 191.376 34.5286L181.527 1.44875ZM173.563 24.6288H192.045V27.1641H173.563V24.6288Z"
                fill="white"
              />
            </svg>
          </Link>
          <div className="flex items-center gap-5 sm:gap-8">
            <SignedIn>
              <button onClick={() => setOpen(true)}>
                {open && <Drawer setOpen={setOpen} />}
                <svg
                  className="h-5 sm:h-8"
                  viewBox="0 0 52 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 2H50"
                    stroke="white"
                    strokeWidth="3.49326"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 37.0001H50"
                    stroke="white"
                    strokeWidth="3.49326"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9.99951 19.5001H49.9995"
                    stroke="white"
                    strokeWidth="3.49326"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </SignedIn>
          </div>
        </div>
      )}
      {open && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          className="absolute left-0 top-0 z-[30] h-full w-[30vw] bg-black opacity-50 sm:w-[60vw] lg:w-[75vw]"
        ></div>
      )}
      {children}
    </div>
  );
};
