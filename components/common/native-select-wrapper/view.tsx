import { ReactNode } from "react";

import { useTranslation } from "next-i18next";

import If from "components/If";

import { SelectOption } from "types/utils";

import useBreakPoint from "x-hooks/use-breakpoint";

interface NativeSelectWrapperProps {
  children: ReactNode;
  options: SelectOption[];
  selectedIndex?: number;
  isClearable?: boolean;
  onChange: (value) => void;
}

export default function NativeSelectWrapper({
  children,
  options,
  selectedIndex,
  onChange,
  isClearable,
}: NativeSelectWrapperProps) {
  const { t } = useTranslation("common");

  const { isMobileView, isTabletView } = useBreakPoint(true);

  function handleChange(event) {
    const index = event.target.value;
    
    onChange(options[index]);
  }

  return(
    <div className="native-select-wrapper">
      {children}

      <If condition={isMobileView || isTabletView}>
        <select
          className="native-select"
          onChange={handleChange}
          value={selectedIndex >= 0 ? selectedIndex : ""}
        >
          <option value="" disabled={!isClearable}>
            { isClearable && t("actions.clear") || t("misc.choose-one") }
          </option>
          
          {options.map(({ label }, i) => <option value={i} key={label}>{label}</option>)}
        </select>
      </If>
    </div>
  );
}