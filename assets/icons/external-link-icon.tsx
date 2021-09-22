import { SVGProps, memo } from "react";

function ExternalLinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9.18069 0C8.71271 0 8.33333 0.379373 8.33333 0.847352C8.33333 1.31533 8.71271 1.6947 9.18069 1.6947H11.107L5.24818 7.55348C4.91727 7.88439 4.91727 8.42091 5.24818 8.75182C5.5791 9.08273 6.11561 9.08273 6.44652 8.75182L12.3053 2.89304V4.81931C12.3053 5.2873 12.6847 5.66667 13.1526 5.66667C13.6206 5.66667 14 5.2873 14 4.81931V0.847352C14 0.379373 13.6206 0 13.1526 0H9.18069Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.19902 1.51317C2.01712 1.51317 1.84267 1.58543 1.71405 1.71405C1.58543 1.84267 1.51317 2.01712 1.51317 2.19902V11.801C1.51317 11.9829 1.58543 12.1573 1.71405 12.286C1.84267 12.4146 2.01712 12.4868 2.19902 12.4868H11.801C11.9829 12.4868 12.1573 12.4146 12.286 12.286C12.4146 12.1573 12.4868 11.9829 12.4868 11.801V9.13852C12.4868 8.75973 12.7939 8.45266 13.1727 8.45266C13.5515 8.45266 13.8585 8.75973 13.8585 9.13852V11.801C13.8585 12.3467 13.6418 12.87 13.2559 13.2559C12.87 13.6418 12.3467 13.8585 11.801 13.8585H2.19902C1.65332 13.8585 1.12997 13.6418 0.744104 13.2559C0.358236 12.87 0.141457 12.3467 0.141457 11.801V2.19902C0.141457 1.65332 0.358236 1.12997 0.744104 0.744104C1.12997 0.358236 1.65332 0.141458 2.19902 0.141458H4.86148C5.24027 0.141458 5.54734 0.448525 5.54734 0.827312C5.54734 1.2061 5.24027 1.51317 4.86148 1.51317H2.19902Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.644078 0.644078C1.05647 0.231682 1.6158 0 2.19902 0H4.86148C5.31839 0 5.68879 0.3704 5.68879 0.827312C5.68879 1.28422 5.31839 1.65462 4.86148 1.65462H2.19902C2.05464 1.65462 1.91617 1.71198 1.81407 1.81407C1.71198 1.91617 1.65462 2.05464 1.65462 2.19902V11.801C1.65462 11.9454 1.71198 12.0838 1.81407 12.1859C1.91617 12.288 2.05464 12.3454 2.19902 12.3454H11.801C11.9454 12.3454 12.0838 12.288 12.1859 12.1859C12.288 12.0838 12.3454 11.9454 12.3454 11.801V9.13852C12.3454 8.6816 12.7158 8.31121 13.1727 8.31121C13.6296 8.31121 14 8.6816 14 9.13852V11.801C14 12.3842 13.7683 12.9435 13.3559 13.3559C12.9435 13.7683 12.3842 14 11.801 14H2.19902C1.6158 14 1.05647 13.7683 0.644078 13.3559C0.231682 12.9435 0 12.3842 0 11.801V2.19902C0 1.6158 0.231682 1.05647 0.644078 0.644078ZM2.19902 0.282915C1.69084 0.282915 1.20347 0.48479 0.844129 0.844129C0.48479 1.20347 0.282915 1.69084 0.282915 2.19902V11.801C0.282915 12.3092 0.48479 12.7965 0.844129 13.1559C1.20347 13.5152 1.69084 13.7171 2.19902 13.7171H11.801C12.3092 13.7171 12.7965 13.5152 13.1559 13.1559C13.5152 12.7965 13.7171 12.3092 13.7171 11.801V9.13852C13.7171 8.83786 13.4733 8.59412 13.1727 8.59412C12.872 8.59412 12.6283 8.83785 12.6283 9.13852V11.801C12.6283 12.0204 12.5411 12.2308 12.386 12.386C12.2308 12.5411 12.0204 12.6283 11.801 12.6283H2.19902C1.9796 12.6283 1.76917 12.5411 1.61402 12.386C1.45887 12.2308 1.37171 12.0204 1.37171 11.801V2.19902C1.37171 1.9796 1.45887 1.76917 1.61402 1.61402C1.76917 1.45887 1.9796 1.37171 2.19902 1.37171H4.86148C5.16214 1.37171 5.40588 1.12797 5.40588 0.827312C5.40588 0.52665 5.16214 0.282915 4.86148 0.282915H2.19902Z" fill="currentColor"/>
    </svg>

  );
}

export default memo(ExternalLinkIcon);
