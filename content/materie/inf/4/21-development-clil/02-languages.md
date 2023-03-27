---
title: Programming languages
type: lecture
weight: 20
summary: "The programming language is an important aspect of software development, today there are thousand of languages each with pros and cons. This lecture discusses the most popular programming languages as well as their usage in software development."
---

## Language *taxonomy*
A *taxonomy* is a system for classification, and programming languages can be
categorized based on various features. Two common methods for classification are
based on *high-level* and *low-level* languages, as well as *compiled* and
*interpreted* languages.

### Low level and high level languages
Low-level languages, like Assembly and C, are more similar to machine language
and require more direct manipulation of hardware. On the other hand, high-level
languages, like Java and Javascript are more "similar" to human language 
offering greater *levels of abstraction*.

{{<def>}}
The **level of abstraction** of a programming language refers to the degree to
which it abstracts (hides) away low-level machine details, such as memory
management, CPU registers, and instructions. High-level languages provide more
abstraction from these details, while low-level languages provide less.
{{</def>}}

One of the main benefits of using high-level languages is that you can achieve
more with less code. This is possible (also) thanks to the *compiler*, which
handles many of the low-level details. Such management would be time-consuming
and error-prone to do manually by the programmer. Thus, programs written using
a high-level language are more *robust* and less *buggy*.

Furthermore, high-level languages tend to be more *readable* and *maintainable*
than low-level languages. This is because they use natural language constructs,
such as object-oriented programming, that make it easier to understand and
organize code.

However, there are trade-offs to using high-level languages. They can sometimes
sacrifice performance in favor of ease of use, and they may not always provide
the same level of control over hardware as low-level languages. Nonetheless, the
benefits of using high-level languages have made them popular choices for modern
software development.

{{<important>}}
In the past, it was customary to state that compiled languages were executed slower
than languages manually written in the target machine code. Indeed, in the past
several parts of a crucially fast software (*e.g.*, the operating system), were
written directly in assembly (the C language provide a way to directly include
assembly code within C code).

Today this is no more the case while the opposite being true. Modern compilers
have become a the processo of *code optimization* which is better performed by
a well designed software, rather then by a (possibly well trained) developer.
{{</important>}}

#### Linear search algorithm
As a straightforward example, we present next the same algorithm, namely *linear
search* implemented in the (very) low-level RISC-V assembly language and in the
high-level Javascript language.

{{<column/columns>}}
{{<column/col>}}
```asm
la a0, array
li a1, 10
li a2, 42
li t0, 0
loop:
  bge t0, a1, exit
  lw t1, (a0)
  beq t1, a2, found
  addi t0, t0, 1
  addi a0, a0, 4
  j loop
found:
  la a0, message
  li a7, 4
  ecall
  j exit
exit:
  li a7, 10
  ecall
```

{{</column/col>}}
{{<column/col>}}

```javascript
function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }
  return -1;
}
```

{{</column/col>}}
{{</column/columns>}}

### Compiled and interpreted languages
*Compiled languages*, such as C and Assembly, require the source code to be
translated into a different (usually lower-level) language. Often this second
language is the machine code that can be executed directly by the CPU. Direct
hardware execution, makes them faster and more efficient when running
resource-intensive applications.

On the other hand, *interpreted languages*, such as Python and JavaScript, are
processed and executed by an interpreter, which produces machine code that is
executed *on the fly*. This approach allows for more flexibility and ease of use,
as the code can be modified and executed without requiring compilation. Sometimes,
the interpreter performs *just-in-time compilation* to optimize the code execution.

## Language ecosystem
The *ecosystem* of a programming language refers to the collection of tools,
libraries, frameworks, and communities that surround and support the language's
development and usage. It includes resources such as *libraries*, *package managers*,
IDEs, online forums, and documentation.

### Libraries
Programming libraries are collections of pre-written code that can be used to
perform common tasks, like working with databases, networking, or user interfaces.
They are used on every *non-trivial* project to save time and budget, good
libraries have been thoroughly tested so that they provide a good level of
protection against bugs and errors.

### Framework
*Frameworks* are collections of libraries, tools, and best practices that provide
a structured way to build software applications. They provide a pre-defined
architecture and workflow for building applications, allowing developers to focus
on the unique features of their app rather than the underlying infrastructure.

### Javascript ecosystem
We will now discuss one of the most comprehensive ecosystem for development, in
particular we will focus on the Javascript language which now features thousand
of libraries, extensions, and tools that make the development of web applications
one of the most interesting experience in software development.

#### Javascript language
Today, Javascript is a short (legacy) name for ECMAScript even though there are
Javascript programs written in older and/or incompatible versions. Regardless this
standardization processo, the web development ecosystem (based around Javascript),
now has more languages:
* Typescript is a *superset* of Javascript that makes it more similar to "standard"
languages. As the name suggests, Typescript fully supports (in fact requires) type
for variables.
* JSX (the acronym for *Javascript XML*) is an extension of Javascript, mostly in
React based development, that adds the possibility of including XML directly into
the Javascript code. This makes it easier to include HTML (a special case of XML)
into the Javascript code.

{{<attention>}}
Currently, browser only understand Javascript code, code written in other languages
(say Typescript), must be translated into Javascript code. This operation, which is
a mix between translation and compilation is referred to as **transpiling**. There
are many tools available for transpile, the most famous being **babel** which is a
key tool in the Javascript ecosystem.
{{</attention>}}

#### Packet manager: `npm` and `yarn`
As the number of libraries grow, the need for a way to search, install, update,
and in general organize them is essential. This is the role of a **packet manager** 
which is fundamental tool in the life of a software developer.

In the Javascript ecosystem there are two popular package manager:
[`npm`](https://www.npmjs.com/) and [`yarn`](https://yarnpkg.com/)
Which packet manager to use, is a matter of taste, a quick web browsing shows that
`npm` is consistently more popular than `yarn` even though this cannot be taken as
a proof of superiority by the former.

#### Libraries and Frameworks
Javascript has countless libraries available (most of them through packet managers),
essentially there is a library for any kind of need. Still, a developer needs to
put all needed parts together and craft an application that suites the needs of
its customers.

Beyond libraries, Javascript is also complemented with several frameworks, which
are collection of libraries and tools to make development of Javascript applications
(frontend, backend, but also native) easy and fun (if you like programming anyway).
To mention the most popular of such framework we have:
* [React](https://react.dev/)
* [Angular](https://angular.io/)
* [VueJs](https://vuejs.org/)
* [Svelte](https://svelte.dev/)
* ... 

## Choice of the appropriate language
When choosing a programming language for a project, there are various aspects to
consider that can narrow down the available choices.

* **Project requirements, constraints and expertise** it's important to take into
account the specific requirements of the project. For example, if the project
requires high-performance computing or real-time data processing.
Another important factor is the availability of expertise in a particular language.
If the development team is not proficient in a particular language, it may lead to
longer development times or lower quality code. It's important to assess the team's
skills and determine whether additional training or hiring is necessary.
* Availability of suitable **libraries and frameworks** for a particular programming
language. For example, the availability of libraries such as jQuery for JavaScript
can ease development tasks. Also, considering the framework available for a
language, like Vue for JavaScript, can be helpful in determining the language to
use.
* An important aspect to consider is the **support from the community**, such as
online forums and blogs, which can help to troubleshoot problems and answer
questions during the development process. Furthermore, market demand is also a
crucial factor to consider when selecting a programming language, as it influences
the job market and the long-term viability of the language.
* Where the application will be **deployed** is an important aspect to consider, as
different languages may be more suitable for specific environments than others.
For example, a language with better memory management may be more appropriate for
an embedded system, while a language with better web development features may b
 more suitable for a web application.


### Native development languages
Here is list of platforms and common languages for native development.
* Mac OS: Java, Swift
* Linux: Java, ...
* Android: Java, Kotlin
* iOS: Swift

### Web development languages
* Frontend: Javascript, WebAssembly
* Backend: PHP, Python, Javascript, Java, ...

### Cross-platform languages and framework
Cross-platform development involves building applications that can run on multiple
platforms, such as Android and iOS, using a single *codebase*. Two possibilities
for cross-platform development are:
* *React-native*: based on the JSX extension to Javascript and
* *Dart* language introduced by Google, paired with the *Flutter* framework.

Cross-platform development can reduce development time and costs, increase productivity,
and enable developers to reach a wider audience with their apps.
