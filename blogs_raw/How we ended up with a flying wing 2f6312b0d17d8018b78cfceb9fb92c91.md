# How we ended up with a flying wing

Status: Done
kim yazıyor: Nursena

As Kora Aerospace team, we approach the design of UAV as a fully integrated process, where aerodynamics, structures and control are developed together rather than as isolated components. One of our primary goals was not to achieve only design requirements, but also to establish a strong and coherent design philosophy. 

**Choosing a Different Starting Point**
We chose a flying wing configuration intentionally from the start. This decision was not made simply to be unconventional, but to challenge ourselves from an engineering standpoint and to present a conceptually strong and distinctive solution in the competitions. We wanted our aircraft to reflect a clear design philosophy rather than an incremental modification of a standard layout. A flying wing offered a unique opportunity to explore an unconventional design space while still being strongly grounded in aerodynamic efficiency.

Our initial concept was a flying wing with a wingspan of 50 cm as seen in Figure 1. This choice was driven by two main ideas. First, a very small aircraft would be harder to detect and track, an important advantage in a combat-oriented scenario. Second, we wanted to explore if it was possible to design a UAV that is physically small, yet aerodynamically efficient and highly maneuverable. In other words, our vision was to create an aircraft that would be “small in size, but big in capability.”

![image.png](How%20we%20ended%20up%20with%20a%20flying%20wing/image.png)

          Figure 1. Initial flying wing concept with a target wingspan of 50 cm

**Why Size and Efficiency Are Critical**

For a small UAV, size alone is not enough. The aircraft must still generate sufficient lift, remain stable, and retain good maneuverability, especially at low speeds as we wanted in our case. As the scale decreases, payload and onboard systems represent a larger fraction of the total weight, increasing wing loading and making lift generation more challenging.

Therefore, our design priorities became clear:

- The aircraft had to be small to reduce detectability especially for Teknofest competition and also to earn more point in SUAS competition.
- It had to be slow and agile for practical operation.
- It had to be aerodynamically efficient enough to compensate for the limited size we wanted.

This naturally led us to configurations in which almost every surface contributes to lift and where unnecessary drag producing components are avoided. Scale visualization is shown in Figure 2.

![image.png](How%20we%20ended%20up%20with%20a%20flying%20wing/image%201.png)

  Figure 2. Scale Visualization highlighting the compact size of the UAV concept

**Why a Flying Wing Instead of a Fuselage**

Initially, a small fuselage-based configuration and a normal flying wing configuration were considered both. However, it quickly became clear that a small fuselage based configuration would be aerodynamically disadvantageous. In conventional layouts, the fuselage produces little or no lift as seen in Figure 3 while adding parasite drag and structural mass. Especially for a very small UAV, this becomes even more severe since nonlifting surfaces occupy a large fraction of the total geometry. 

Then, when we consider the weight, our payload requirements were relatively high for our mini UAV, which meant that high lift capability at low speed was essential. Using a fuselage based configuration reduces the effective lifting area and that would directly lower the lift to weight ratio and degrade performance. On the other hand, a flying wing provides us the entire planform to generate lift, maximizing aerodynamic efficiency within a limited span.

In addition, the compact nature of a flying wing supports lower observability by reducing frontal area and geometric discontinuities that increase detectability. For a small and agile UAV, this made the flying wing the most logical configuration.

To sum up, the flying wing configuration provided several key advantages:

- All surfaces contribute directly to lift generation
- Reduced parasite drag due to the absence of a fuselage
- Improved lift-to-weight ratio for small scale operation
- Compact geometry with lower frontal area

![image.png](How%20we%20ended%20up%20with%20a%20flying%20wing/image%202.png)

     Figure 3. Lift distribution of a fuselage based configuration, showing no lift production of fuselage

**The Challenge of Stability and Control**

Removing the tail introduces significant stability and control challenges. In tailless aircraft, longitudinal stability and trim must be achieved through careful airfoil selection, center of gravity placement and control surface design. 

To address this, we adopted a reflex airfoil to provide the required pitching moment characteristics and designed elevons to supply both pitch and roll control. At the low Reynolds number associated with small UAVs, airfoil performance and control effectiveness become particularly sensitive, making aerodynamic and stability considerations, making aerodynamic and stability considerations tightly coupled in our design process. 

**When Physics Set the Limits: From 50 cm to 80 cm**

Our original target wingspan of 50 cm was the ideal in terms of earning more points and detectability. However, as the design matured and preliminary aerodynamic and weight analyses were performed, fundamental physical limitations became apparent. At such a small scale, wing loading increased too much while low Reynolds number effects reduced achievable lift coefficients and also aerodynamic efficiency. 

Performance estimates showed that sufficient lift at low speeds requires very high angles of attack or excessive propulsion power at 50 cm span, which has disadvantages in terms of stability and control margins. In other words, the configuration was conceptually attractive but not practically reliable. Performance comparison of UAVs with 50 and 80 cm wingspans are shown in Figure 6 and Figure 7. 

To resolve this, we increased the wingspan to 80 cm as seen in Figure 4. This wingspan allowed us to operate in a more favorable Reynolds number regime, reduce wing loading and significantly improve lift generation. The transition from 50 cm to 80 cm was therefore not a change in design philosophy, but an adaptation to aerodynamic and structural reality.

To sum up, the transition from 50 cm to 80 cm wingspan was driven by:

- Excessively high wing loading at 50 cm scale
- Degraded aerodynamic performance at very low Reynolds numbers
- Insufficient lift margins at low flight speeds
- Reduced stability and control robustness

![image.png](How%20we%20ended%20up%20with%20a%20flying%20wing/image%203.png)

                        Figure 4. New design of the UAV with 80 cm wingspan

![image.png](How%20we%20ended%20up%20with%20a%20flying%20wing/f49a7e9c-3667-4832-a6ec-19b6cfb6d6c0.png)

                              Figure 5. Scale visualization of the new UAV

![image.png](How%20we%20ended%20up%20with%20a%20flying%20wing/c6d50f1b-d526-418c-9cc1-eaa20ce732e4.png)

Figure 6. Performance and stability analysis of first UAV with 50 cm wingspan

![image.png](How%20we%20ended%20up%20with%20a%20flying%20wing/62e6e51f-65c7-434d-bcfb-5f83ae0bca2d.png)

Figure 7. Performance and stability analysis of second UAV with 80 cm wingspan

**A Configuration Driven by Mission and Physics**

During the process, the flying wing remained the core of our design philosophy. The combination of small size, low detectability, high lift requirement, low speed maneuverability, and aerodynamic efficiency consistently pointed toward a fully lifting, tailless configuration.

In summary, we did not “end up” with a flying wing by chance. We started with it deliberately, aiming to design a UAV that would be small enough to be hard to detect, agile enough for maneuvering, and efficient enough to sustain low-speed flight. When physical limitations prevented the realization of our initial 50 cm target, we adapted the scale while preserving the same design logic.