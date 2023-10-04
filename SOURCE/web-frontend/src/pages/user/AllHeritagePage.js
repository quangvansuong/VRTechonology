import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import TabGrid from "components/user/cards/TabCardGrid.js";
import FAQS from "components/user/faqs/SingleCol.js";

export default ({ roundedHeaderButton }) => {
    return (
        <AnimationRevealPage>
            <TabGrid />
            <FAQS />
        </AnimationRevealPage>
    );
}

