# Why are we designing our own PCB

Status: Done
kim yazıyor: Yiğit Kılıçarslan

# Why We're Designing Our Own PCB

*Blog by Yiğit K.*

---

We are a small university team attending SUAS and Teknofest 2026. Both competitions reward smaller aircraft in direct and indirect ways — SUAS directly gives points for smaller size, Teknofest uses hit detection based on size relative to the video feed, so without adjustable optics, smaller means harder to hit.

So from the start our main design goal was being as small as possible. But it's a tough task considering we need to do onboard video processing and fully autonomous flight.

![Our V1 custom flight controller - 3D Render](Why%20are%20we%20designing%20our%20own%20PCB/image.png)

Our V1 custom flight controller - 3D Render

## Why Weight is Critical

For the aircraft to perform the required tasks, it needs a minimum cruise speed no more than 12 m/s. That constraint limits our max wing loading to around 45 g/dm², assuming a cruise C_L of 0.5, in line with high maneuverability RC planes. To make the smallest aircraft possible, we need to minimize weight.

Electronics payload directly determines the weight of the rest of the components — battery and airframe size both depend on total weight. So minimizing electronics weight was essential.

## Component Requirements

For the flight controller, most designs use an STM32F4xx or STM32F7xx. F4 based controllers lack support for many ArduPilot features, so we chose to go with an F7 based controller.

For onboard AI, we initially wanted to use a cheaper accelerator. There are some good options on paper, but after considering availability and ease of use, we decided to go with Jetson Orin Nano. I go into more detail on the image pipeline blog post which is coming soon.

![Orange Pi CM5, one of the AI accelerators we considered](Why%20are%20we%20designing%20our%20own%20PCB/image%201.png)

Orange Pi CM5, one of the AI accelerators we considered

## The Options

We had 3 choices:

1. F7 FC + Jetson on a carrier board + cabling and extra sensor boards
2. Fully integrated solution like [Airvolute DroneCore Suite 2](https://airvolute.com/shop-prod/uav-autopilots/dcs-2-default/)
3. A custom PCB that only has what we need

| Option | Weight | Cost |
| --- | --- | --- |
| Modular (F7 FC + Jetson & carrier board + wifi + cabling) | ~280g | ~$700 |
| Airvolute DCS-2 | 206g | ~$3,200 |
| Custom PCB | ~90g | ~$650 |

As apparent from this table, the custom option is the lightest by a large margin. But it also requires the most effort.

## Other Benefits

Custom PCB also allows us the most flexibility in terms of Jetson-FC communication. It also allows us to embed sensors and external power circuitry right on the board.

As a long time EE hobbyist, I was eager to take on the custom PCB challenge. So I embarked on the 8 month endeavor of creating our own FC from scratch. I will discuss the custom PCB design journey in a separate blog post coming soon.