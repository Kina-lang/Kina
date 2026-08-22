# Kina

## What is Kina?

Kina is a compiled, statically-typed programming language and toolchain that is designed to be easy to use for developers coming from high-level interpreted languages, while still providing the performance and other benefits of a compiled language.

Kina is built on top of LLVM IR, which allows it to run on a wide variety of platforms and architectures, have strong interoperability with C-ABI languages (C, Rust, ...) and allows it to leverage the LLVM optimization algorithms.

## Why I have created Kina?

I have created Kina to learn about low-level programming concepts (C, working with memory, ...) and compiler design and to prepare myself for university. I am currently working on this project as a hobby project, but also as my Maturita (high school graduation) project, which means that I cannot currently accept any contributions (I will accept them after I graduate).

## Currently wanted features (not in order)

This can (and as I know myself, will) change over time.

- Modules (import/export)
- Functions
- Variables (mutable and immutable)
- Pre-defined (int, bool, array, void, any, ...) and user-defined types, enums, interfaces
- Control flow (if, else, while, for, switch)
- Expressions (arithmetic, logical, comparison, ...)
- Error handling (try/catch, throw)
- Standard library (math, files, io, ...)
- CLI with compiler, package manager, project manager
- Toolchain version management
- Package management
- Compilation of programs for Linux, Windows, ESP32
- Memory management (ARC, memory leak detection)
- Signal handling (SIGINT, SIGTERM, ...)
- Stack traces
- Objects, member access
- Extending types, variables, functions, ... (like in TS)
- Language server (for IDEs) and VSCode, Zed extension

Potentially:

- Classes, inheritance, polymorphism
- TS/JS Interoperability
- Bare metal compilation (no stdlib, memory management, ...)

## What is where

- [Compiler](https://github.com/Kina-lang/Compiler)
- [CLI](https://github.com/Kina-lang/Cli)
- [Documentation](https://github.com/Kina-lang/Docs)

## License

MIT (More info in LICENSE file)

TL;DR: Do whatever you want with this project, just don't blame me if something breaks or if you lose your data.

## Authors

- Martin Petr: [GitHub](https://github.com/martinpetrdev), [Website](https://martinpetr.dev), [LinkedIn](https://www.linkedin.com/in/martinpetrdev)
