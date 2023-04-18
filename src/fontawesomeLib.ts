import { library } from '@fortawesome/fontawesome-svg-core';
import { faCode, faHighlighter } from '@fortawesome/free-solid-svg-icons';
import {
    faMagnifyingGlass as faMagnifyingGlassSolid,
    faXmark as faXmarkSolid
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faCode,
    faHighlighter,
    faMagnifyingGlassSolid,
    faXmarkSolid
);

export default library