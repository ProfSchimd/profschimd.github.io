---
title: Programming languages
type: lecture
weight: 20
summary: "The programming language is an important aspect of software development, today there are thousand of languages each with pros and cons. This lecture discusses the most popular programming languages as well as their usage in software development."
---

## Language *taxonomy*
A *taxonomy* is a system that divides some concepts or objects into category.
For example the division of living things into plants, fungi, and animals, the
division of animals into mammals, vertebrates and others is a taxonomy.

Also programming languages can be categorized using various taxonomies, we discuss
here two of them, one based on the *level of abstraction*, and one based on the
*execution model* of the language.

### Low level and high level languages
*Low-level* languages, like Assembly and C, resemble machine languages and require more direct manipulation of hardware concepts like memory, registers, and files. In contrast, *high-level*
languages, like Java and Javascript, resemble more human language 
offering greater *levels of abstraction*. With these languages it is common to work on objects, lists, functions, and other "high-level" concepts.

{{<def>}}
The **level of abstraction** of a programming language refers to the degree to
which it abstracts (hides) away low-level machine details, such as memory
management, CPU registers, and instructions. High-level languages provide more
abstraction from these details, while low-level languages provide less.
{{</def>}}

One of the main benefits of using high-level languages is that you can achieve
more with less code. This is also possible because of the *compiler*, which
handles many of the low-level details. Such management would be time-consuming
and error-prone if manually performed by the programmer. Thus, programs written
using a high-level language are more *robust* and less *buggy*.

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

Today this is no more the case, indeed the opposite is now true. Modern compilers
performs a step known as *code optimization*. In a well designed compiler, such
step leads to more efficient code than what a well trained developer could do.
{{</important>}}

#### Linear search algorithm
As a straightforward example, we present next the same algorithm, namely *linear
search* implemented using the (very) low-level RISC-V assembly language and using
the high-level Javascript language.

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
In *compiled languages*, such as C and Assembly, the source code written by
developers must be translated (compiled) into a different, usually lower-level,
language. This second language is often the machine language which can be directly
executed by the CPU. This direct execution makes programs run faster and, in
general, is more efficient, especially with applications that are resource demanding.

In *interpreted languages*, such as Python and JavaScript, the source code written by developers are not translated, but *parsed* and *interpreted* by a specific software, which is called an *interpreter*.

This program produces machine code, which is immediately executed *on the fly*.
This approach allows for more flexibility and ease of use, as the code can be
modified and executed without requiring the compilation step. Sometimes, the 
interpreter performs *just-in-time compilation* to optimize the code execution.
This operation is a compilation that happens right before the code is to be
executed (it happens just-in-time), by performing this step, the interpreter
can perform some optimization that will make the code run faster.

{{<attention>}}
An interpreter like the Python interpreter is different by a virtual machine like
the Java Virtual Machine. The difference is that, while an interpreter reads and
parses the "original" source code (*e.g.*, the Python code), a virtual machine reads
and executes a compiled code (*e.g.*, the bytecode).
{{</attention>}}

## Language ecosystem
The *ecosystem* of a programming language refers to the collection of tools,
libraries, frameworks, and communities surrounding and supporting the development
and the usage of a particular language. It includes resources such as *libraries*,
*package managers*, IDEs, online forums, and documentation.

### Libraries
Libraries are collections of pre-written code that can be used to perform common
tasks, like interacting with databases, accessing the network, or building the
user interfaces. Libraries are used on every *non-trivial* project to save time
and budget. Furthermore, good libraries have been thoroughly tested so that they
provide a good level of protection against bugs and errors.

### Framework
*Frameworks* are collections of libraries, tools, and best practices that provide
a structured way to build software applications. They provide a pre-defined
architecture and workflow for building applications, allowing developers to focus
on the unique features of their app rather than the underlying infrastructure.

### Javascript ecosystem
We will now discuss one of the most comprehensive ecosystem for development, in
particular we will focus on the Javascript language, which features thousand
of libraries, extensions, and tools that make the development web applications
an interesting and "fun" experience.

#### Javascript language
Today, Javascript is a short (legacy) name for ECMAScript, some
Javascript programs, however, are written in older and/or incompatible versions. Despite this
standardization process, web development ecosystem (based on Javascript),
features several languages:
* Typescript is a *superset* of Javascript that makes it more similar to "standard"
languages. As the name suggests, Typescript fully supports (in fact requires)
variables typing.
* JSX (an acronym for *Javascript XML*) is an extension of Javascript, mostly used in
React development. JSX adds the possibility of including XML directly into
the Javascript code, making it easier manage HTML (a special case of XML)
with Javascript.

{{<attention>}}
Currently, browser only understand Javascript code, code written in other languages
(say Typescript), must be translated into Javascript code. This operation, which is
a mix between translation and compilation, is referred to as **transpiling**. There
are many tools available for transpile, the most famous being **babel** which is a
key tool in the Javascript ecosystem.
{{</attention>}}

#### Packet manager: `npm` and `yarn`
As the number of libraries grow, good ways to search, install, update,
and in general organize them become essential. This is the role of a **packet manager** 
which is a fundamental tool in software development.

The Javascript ecosystem has two popular package managers:
[`npm`](https://www.npmjs.com/) and [`yarn`](https://yarnpkg.com/).
Which packet manager to adopt, is a matter of taste, a quick web browsing shows that
`npm` appears more popular than `yarn` even though this cannot be taken as
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
