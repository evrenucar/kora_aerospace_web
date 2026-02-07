# Converting our XFLR5 designs to Fusion360 CAD

Status: Done
cover_image: Converting%20our%20XFLR5%20designs%20to%20Fusion360%20CAD/airfoil.png
kim yazıyor: Evren Uçar
planned release date: January 31, 2026

---

*Post by evren*

---

**At [KORA](https://www.kora-aerospace.org/), we're building UAVs from scratch airframe, avionics, and everything in between. A critical part of our workflow is going from aerodynamic design to manufacturable CAD models. This post documents our pipeline for taking a wing designed in XFLR5 and turning it into a precise, solid 3D model in [Autodesk Fusion 360.](https://www.autodesk.com/products/fusion-360/personal)

Why does it matter? Because accurate geometry is critical when it comes to the last %5. A wing that performs well in simulation needs to be built *exactly* or as closely as possible to the base design. Any and all deviation in airfoil shape, twist, or chord distribution can significantly affect flight characteristics. For this reason we've developed this workflow to ensure our manufactured wings match our aerodynamic intent.

---

## What is XFLR5?

[XFLR5](https://www.xflr5.tech/) is an open-source analysis tool for airfoils, wings, and aircraft operating at low Reynolds numbers. It's widely used in the RC aircraft, UAV, and glider communities for:

- **Airfoil analysis** using XFoil's direct and inverse methods
- **Wing and plane design** with VLM (Vortex Lattice Method) and 3D panel methods
- **Stability analysis** for full aircraft configurations
    
    ![image (17).png](Converting%20our%20XFLR5%20designs%20to%20Fusion360%20CAD/image_(17).png)
    

> *"Image: Screenshot of XFLR5 showing a wing design with multiple airfoil sections"*
> 

XFLR5 is excellent for aerodynamic design and analysis, but it doesn't produce CAD-ready geometry. That's where the challenge begins.

---

## The Problem: XFLR5 to CAD is Not Straightforward

When you export a wing from XFLR5, you get an `.xml` file containing:

- Wing section positions (spanwise locations)
- Airfoil names for each section
- Chord lengths
- Twist angles (washout/washin)
- Dihedral and sweep information

**What you don't get:** actual airfoil coordinate data embedded in a format CAD software can directly import.

The airfoils themselves are stored separately as `.dat` files—simple text files containing X-Y coordinates in **Selig format**:

```
NACA 2412
1.000000  0.001260
0.950000  0.011900
0.900000  0.022100
...
0.000000  0.000000
...
1.000000 -0.001260
```

The coordinates run from the trailing edge, around the leading edge, and back to the trailing edge. X values are normalized (0 to 1), and Y values represent the thickness/camber distribution.

---

## Quick Alternative: Export a Mesh Directly from XFLR5

Before diving into the full CAD workflow, it's worth knowing that XFLR5 can export a 3D mesh of your aircraft directly:

1. In the **Plane/Wing view**, right-click on your plane in the object list
2. Select **Export Mesh**
3. Choose your resolution (around **80 points per variable** is a good reference for decent detail)
4. Save as `.stl` or similar mesh format

<aside>
⚠️

**Important:** The exported mesh is scaled **1:100**. You'll need to scale it up by a factor of **100×** in your CAD software to get real-world dimensions.

</aside>

![image.png](Converting%20our%20XFLR5%20designs%20to%20Fusion360%20CAD/image.png)

> *"Image: XFLR5 right-click menu showing the Export to STL (Mesh) option on a plane object"*
> 

**When is this useful?**

- Quick visualization of your design in CAD
- Checking proportions and fit with other components early on
- Creating renders or presentations before finalizing geometry

**When is this NOT enough?**

- Mesh geometry isn't parametric or easily editable
- Surface quality may not be sufficient for manufacturing (3D printing, CNC)
- No control over individual airfoil accuracy or loft quality

For CAD models you can shell and add remove volume from, you'll want to follow the full workflow below and get a solid body.

---

## Step-by-Step: Manual Workflow for XFLR5 to CAD

### Step 1: Export Your Airfoil .dat Files

In XFLR5, go to **File → Export → Current Foil** for each airfoil used in your wing. Alternatively, download airfoils from databases like:

- [Airfoil Tools](http://airfoiltools.com/) - searchable database with polar data
- [UIUC Airfoil Database](https://m-selig.ae.illinois.edu/ads/coord_database.html) - comprehensive academic resource

![image (18).png](Converting%20our%20XFLR5%20designs%20to%20Fusion360%20CAD/image_(18).png)

> *"Image: Example of airfoild you can download as a .dat file from* [http://airfoiltools.com/](http://airfoiltools.com/)*"*
> 

### Step 2: Install an Airfoil Import Add-in for Fusion 360

Fusion 360 doesn't natively import `.dat` files. You'll need an add-in:

[**Airfoil Tools Add-in**](https://apps.autodesk.com/FUSION/en/Detail/Index?id=5447707798035545266) — A free add-in from the Autodesk App Store that:

- Imports `.dat` files directly
- Creates spline sketches from airfoil coordinates
- Allows chord scaling and positioning

(its also called airfoil tools but they are apparently not associated at all with the airfoil tools website :D)

Install it via: **Fusion 360 → Utilities → Scripts and Add-ins → Add-ins Tab → Visit Autodesk App Store**

you can also download it from their wensite

![image.png](Converting%20our%20XFLR5%20designs%20to%20Fusion360%20CAD/image%201.png)

> *"Image: Fusion 360 Add-ins dialog showing the Airfoil Tools add-in installed"*
> 

### Step 3: Import Airfoils at Each Wing Section

![image.png](Converting%20our%20XFLR5%20designs%20to%20Fusion360%20CAD/image%202.png)

> *"Image: Fusion 360 workspace "*
> 

For each wing section defined in your XFLR5 design:

1. Create a **construction plane** at the correct spanwise location
2. Creat a line that starts at the correct offset and has the correct span lenght
3. Use the Airfoil Tools add-in to import the corresponding `.dat` file
4. For the settings of the airoil: a set of 30 points and a minimum thickness of 0.6mm (less trouble shelling)
5. **Rotate** the airfoil to apply the twist angle
    1. The rotation center is located at 1/4 the wingspan

This is where it gets tedious. A typical wing might have 5-10 sections, each requiring:

- Correct Y-position (span location)
- Correct chord scaling
- Correct twist rotation (around the quarter-chord or leading edge)
- Correct dihedral angle
- Creating correct 3d spline for the rails.

### Step 3.5: Retrace the Airfoil as a Closed Spline

<aside>
🚨

**Critical Step:** The imported airfoil points are most of the times **not connected** into a single closed curve. If you try to loft or extrude directly, Fusion 360 won't recognize a valid face profile.

</aside>

To create a usable profile, you need to **retrace the airfoil** with the fit-point-spline drawing tool:

1. **Convert the imported lines to construction geometry**
    - Select all the imported airfoil line segments
    - Press **X** or right-click → **Normal/Construction** to toggle them to construction lines (they'll turn orange/dashed)
    - This keeps them visible as a reference without interfering with your sketch
2. **Draw a Fit Point Spline over the airfoil**
    
    ![image.png](Converting%20our%20XFLR5%20designs%20to%20Fusion360%20CAD/image%203.png)
    
    > *"Image: Fusion 360 sketch showing construction lines (dashed) with a fit point spline traced over the airfoil, with the trailing edge closed"*
    > 

- Go to **Sketch → Create → Fit Point Spline**
- Click along the airfoil points to trace the curve
- **For smooth/gradual curves** (like the middle of the airfoil): you can **skip points** to get a smoother result
- **For sharp/fast-changing curves** (like the leading edge): **select every point** to maintain accuracy
1. **Close the trailing edge**
    - Make sure to connect the upper and lower surfaces at the trailing edge
    - Either click the starting point to close the spline, or draw a short line segment to close the gap
    - The profile must be a **fully closed loop** for lofting to work

Repeat this for each airfoil section before proceeding to the loft.

### Step 4: Loft the Airfoils into a Solid Body

![image.png](Converting%20our%20XFLR5%20designs%20to%20Fusion360%20CAD/image%204.png)

> *"Image: Fusion 360 loft dialog with multiple airfoil profiles selected, showing the preview of the wing surface"*
> 

![image.png](Converting%20our%20XFLR5%20designs%20to%20Fusion360%20CAD/image%205.png)

Once all your airfoil sketches are in place:

1. Go to **Solid → Create → Loft**
2. Select your airfoil profiles in order from root to tip
3. Optionally add **guide rails** along the leading and trailing edges for better surface control
    1. If you have a very simple airfoil without rails it is usually fine without. However if there are multiple its best to create a pair of guide rails one at the front and one in the back. You can create this with the 3D sketch feature.
4. Click **OK** to generate the solid wing
5. You can also check your resulting geometry flow by using the zebra surface analysis tool.

The result is a manufacturable solid body that accurately represents your aerodynamic design.

![image.png](Converting%20our%20XFLR5%20designs%20to%20Fusion360%20CAD/image%206.png)

> *"Image: Final lofted wing solid body in Fusion 360, shown in shaded view with smooth surfaces"*
> 

---

## Things that become annoying after doing it a couple o times

This manual process has several pain points:

| Challenge | Impact |
| --- | --- |
| **Manual data entry** | Each section requires entering position, chord, and twist values by hand |
| **Rotation reference points** | XFLR5 rotates around the quarter-chord; getting this right in CAD requires calculation |
| **Airfoil file management** | Multiple `.dat` files need to be organized and matched to sections |
| **Repeatability** | Design iterations mean redoing the entire process |
| **Human error** | Easy to make mistakes with so many manual steps |

---

## Our Solution: Automating the Pipeline

After doing this process too many times and making mistakes, we built something better.

<aside>
⚡

**Coming Soon: KORA Aero-CAD Bridge**

We've developed a **Fusion 360 add-in** that automates the entire XFLR5-to-Fusion workflow:

- 📂 **Reads XFLR5 `.xml` wing exports** directly
- 📐 **Auto-imports all required airfoil `.dat` files**
- 🔄 **Positions, scales, and rotates** each section automatically
- 📏 **Respects XFLR5's rotation conventions** (quarter-chord twist, leading-edge sweep)
- 🏗️ **Generates the loft** with proper guide rails
- ⚙️ **Parametric output** — change your XFLR5 design, re-run the script, get updated CAD

**One click. Accurate geometry.** 

</aside>

> *"Image: Screenshot of the KORA Aero-CAD Bridge add-in dialog in Fusion 360, showing import options and a preview of the wing"*
> 

---

## Interested?

We're currently testing this tool internally and will be releasing it to the community.

**If you'd like early access or want to provide feedback, reach out to us:**

<aside>
📧

**Email: kora.aerospace@gmail.com**

Let us know:

- Who are we chatting we :)
- Your use case (RC planes, drones, gliders, etc.)
- What features would be most valuable to you
- Whether you'd want a free open-source tool or a polished commercial add-in
</aside>

---

## Resources & References

**Software:**

- [XFLR5 Official Site](https://www.xflr5.tech/) - Download and documentation
- [Airfoil Tools Add-in for Fusion 360](https://apps.autodesk.com/FUSION/en/Detail/Index?id=5447707798035545266)

**Airfoil Databases:**

- [Airfoil Tools](http://airfoiltools.com/) - Search, compare, and download airfoils
- [UIUC Airfoil Coordinates Database](https://m-selig.ae.illinois.edu/ads/coord_database.html) - 1,650+ airfoils in Selig format

**Tutorials:**

- [Importing Airfoil from XFLR5 to Solidworks](https://grabcad.com/tutorials/importing-airfoil-from-xflr5-and-auto-generating-wings-in-solidworks) - GrabCAD tutorial with Excel workflow
- [Wing Design in Fusion 360](https://www.youtube.com/watch?v=XOS2nsbd8Fs) - YouTube tutorial on lofting workflows
- [WingHopper.com](http://WingHopper.com) - Web-based wing CAD with XFLR5 XML export

**Community Discussions:**

- [XFLR5 SourceForge Forum](https://sourceforge.net/p/xflr5/discussion/679396/) - Active community for XFLR5 users

---

*This post is part of our documentation series for the SUAS competition. Follow our development journey at [kora-aerospace.org/blog](http://kora-aerospace.org/blog).*

Join the newsletter by: