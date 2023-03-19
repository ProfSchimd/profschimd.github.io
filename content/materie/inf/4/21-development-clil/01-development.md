---
title: Software development
type: lecture
weight: 10
summary: "Development is a generic term including many aspects of software production, in this lecture, wer are going to discuss some of these aspects"
---

To understand *software development*, we will start from the definition that is
given at the beginning of the corresponding Wikipedia page.

{{<def title="Software Development">}}
Software development is the process of conceiving, specifying, designing,
programming, documenting, testing, and bug fixing involved in creating and
maintaining applications, frameworks, or other software components.
([Wikipedia EN](https://en.wikipedia.org/wiki/Software_development)) 
{{</def>}}

This definition shows that *programming* is only one among many operations
involved in software development.

## Target Platform
In today's world, developing software is as diverse as the myriad of platforms
that are used. These platforms includes:
* Desktop and laptop PCs, possibly with different *Operating Systems* (Windows,
Mac OS, Linux);
* Mobile devices (smartphones, tablets, ...), possibly with different *Operating
Systems* (Android, iOS);
* Large computing machines and/or infrastructure (Cluster servers, AWS, Azure, ...)
* Small *embedded* devices: Arduino, smartwatches, smartbands, ...
* Other smart devices: car, fridge, dishwasher, heater, ...

As the above (non-exhaustive) list testifies, developing is, first of all, a matter
of deciding which *platform* to target. It is in fact impossible do develope once
and hoping to target all possible platforms. Among the many differences between
devices the following are some of the most obvious:
* Screen size (if any screen is present at all);
* Computing capabilities: CPU, memory, ...
* Libraries and framework available
* Hardware available (mouse, keyboard, GPS, antennas, ...).

{{<exercise>}}
Consider these two devices you certainly own: a PC (either a laptop or a desktop)
and a smartphone, list all differences in terms of:
* screen
* hardware
* sensors
* operating systems and libraries.
{{</exercise>}}

### Native and Web
When talking about *software development*, there are two broad categories of
development: *native* and *web* (there are some more which we don't discuss
here).

{{<def title="Native Development">}}
When the target platform is a specific operating system, we talk about **native
development**. The term native refers to the fact that the tools used have been
created specifically for the target platform.
{{</def>}}

An example of native development is the creation of a Windows application using
*.NET framework* targeting an `exe` (*executable*) file. A typical native application
is the web browser (Chrome, Firefox, ...). 

{{<def title="Web Development">}}
When the target platform are the *virtual machines* running inside a Web Browser,
we talk about **Web Development**. The term Web refers to the usage of Web Browsers
and to the fact that the results are (almost always) *websites*, rather then
native programs.
{{</def>}}

An example of web development is the creation of a website using HTML/CSS and
Javascript. We use web applications all the time, for example when accessing our
GMail inbox or Spaggiari register.

{{<attention>}}
Many web applications (*e.g.*, GMail, Facebook, ...) have a native App counterpart
for the specific operating system (*e.g.*, Android, iOS, Windows, ...).
{{</attention>}}

#### Pros and cons of Native and Web
It is interesting to compare native and web development to understand what are
the the advantages and disadvantages of each of them.

* **Effort**
  * Native: {{<colored danger High>}} effort because we must address each supported platform
  * Web: {{<colored success Low>}} effort since the same code runs on browsers installed in different platforms
* **Efficiency**
  * Native: {{<colored success High>}} efficiency because the code is run *natively* by the machine rather then *virtualized* 
  * Web: {{<colored danger Low>}} efficiency due to the virtualization which is slower than the machine
* **Security**
  * Native: {{<colored danger Low>}} security since the code may be executed with administrative privileges and gain access to all resources
  * Web: {{<colored success High>}} security because the code is generally run on a *sandbox* (a confined executing environment)
* **Cost**
  * Native: {{<colored danger High>}} costs because code must be developed for every target, sometimes it may require more code due to the usage of *lower level languages* (when compared with Web development)
  * Web: {{<colored success Low>}} costs because the code can be executed in different platforms and languages could be at *higher level*.
* **Expertise**
  * Native: {{<colored danger High>}} expertise are necessary because developers should know many platforms
  * Web: {{<colored danger High>}} expertise are necessary because Web development frameworks are generally more complex
* **Reliability**
  * Native: {{<colored success Good>}} reliability since the code is stored and runs in the target machine
  * Web: {{<colored danger Not so good>}} reliability since the code is often on a different machine, thus inaccessible without an Internet connection.

## Web Development
Today, we are witnessing a dramatic shift towards web development. While desktop
Apps are replaced by Web Apps, native development is used mostly for mobile
platforms (Android and iOS) and **cross-platform** frameworks are becoming
increasingly popular and adopted.

{{<def title="Cross-platform">}}
We talk about **cross-platform** tools or frameworks when it can be used or it
targets many platforms (typically many *operating systems*) at once. An example
of a *cross-platform* technology is Java which is written once and run on many
platforms (thanks to the *Java Virtual Machine, JVM*).
{{</def>}}

### Web app architecture
The term **architecture** refers to the structure and organization of an application.
It Web App this structure involves the [**frontend**](#frontend-development) and the
[**backend**](#backend-development). Furthermore, elements like framework and server
infrastructure are part of the architecture of a Web App.

#### Frontend development
The *frontend* is the part of a web app the users with, **frontend development**
is the practice of designing and building *user interfaces*. This involves: 
* creating HTML, CSS, and JavaScript code that is visually appealing and
* making the web page interactive, and *responsive* to user actions.

The Javascript code of the frontend, as well as the *rendering* of the web pages
runs on a *web browser*, which is a software used to browse the Web. More precisely,
all modern browsers implement a *virtual machine* that interprets Javascript code,
such code is usually downloaded from the server and run on the client.

#### Backend development
The *backend* is the part of the web app that runs on the *server* and manages
data, **backend development** is the practice of creating server-side applications.
This involves:
* writing code in server-side languages like PHP, Python, Java, Javascript, ... 
* working with databases, APIs, and other backend technologies. 

#### Full stack development
When we want to refer to both frontend and backend development, we talk about
**fullstack** development. Nowadays, it is common to see job offers for all three
type of development (as well as job offers for *native development*).

However, when the size of the development team grows (say beyond few units), it
is common to see the team dividing into frontend and backend. In these cases, a
developer specializes on one specific aspect, **but it still needs to broadly
know the principles and technologies of web development as a whole**.

## References

{{< youtube PRSyHTajxPk >}}
