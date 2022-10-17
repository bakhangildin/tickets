#!/Library/Frameworks/Python.framework/Versions/3.10/bin/python3.10
from pathlib import Path
import sys


def component_data(name: str) -> str:
    return f"""import {{ Component }} from "solid-js";
import styles from "./{name}.module.css"

type {name}Props = {{}};

const {name}: Component<{name}Props> = (props) => {{
  
  return <div class={{styles.{name}}}>
    {name}
  </div>;
}};

export default {name};"""


def styles_data(name: str) -> str:
    return f""".{name} {{}}"""


def create_files(folder: Path, name: str) -> None:
    folder.joinpath(f"{name}.tsx").write_text(component_data(name))
    folder.joinpath(f"{name}.module.scss").write_text(styles_data(name))


if __name__ == "__main__":
    args = sys.argv
    if len(args) != 3:
        raise ValueError("error")
    folder = Path(args[1]).resolve()
    name = args[2]
    create_files(folder, name)
