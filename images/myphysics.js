﻿"use strict";
function rays1() {
    //clear the screen
    ctx1.fillStyle = "#374d63";
    ctx1.fillRect(0, 0, canv1.width, canv1.height);
    ctx1.beginPath();
    ctx1.strokeStyle = "black";
    for (let i = 16; i < 128; i += 16) {
        ctx1.moveTo(i, 0);
        ctx1.lineTo(i, 16);
    }
    ctx1.stroke();
    screentexture.needsUpdate = true;
    render();

    if (lensID == 0) {
        ctx1.fillStyle = "#3e6082";
        ctx1.fillRect(0, 0, canv1.width, canv1.height);
        ctx1.beginPath();
        ctx1.strokeStyle = "black";
        for (let i = 16; i < 128; i += 16) {
            ctx1.moveTo(i, 0);
            ctx1.lineTo(i, 16);
        }
        ctx1.stroke();
    }
    else {
        let xm, x, y, z = 0;
        let alpha, beta, gamma;

        alpha = Math.cos(Math.PI / 2 + rotangle);
        beta = 0;
        gamma = Math.sqrt(1 - alpha * alpha);
        let aprad = beamradius;
        let aprad2 = aprad * aprad;
        const nlist = [1, 1.52, 1];
        let tlist; let clist;

        // parameters of optical system
        if (lensID == 1) {
            clist = [1 / lensc[0], -1 / lensc[0], 0,];
            tlist = [(base[2].position.z - base[1].position.z + lensc[1] / 2) / gamma, lensc[1], (base[1].position.z - base[0].position.z - lensc[1] / 2) / gamma];
        }
        if (lensID == 2) {
            clist = [0, -1 / lensa[0], 0,];
            tlist = [(base[2].position.z - base[1].position.z) / gamma, lensa[1], (base[1].position.z - base[0].position.z - lensa[1]) / gamma];
        }
        if (lensID == 3) {
            clist = [0, -1 / lensb[0], 0,];
            tlist = [(base[2].position.z - base[1].position.z + lensb[1]) / gamma, lensb[1], (base[1].position.z - base[0].position.z - lensb[1]) / gamma];
        }
        if (lensID == 4) {
            clist = [1 / lensb[0], 0, 0,];
            tlist = [(base[2].position.z - base[1].position.z) / gamma, lensb[1], (base[1].position.z - base[0].position.z) / gamma];
        }

        let arr, arrnew;
        (arr = []).length = 8976;
        arr.fill(0);
        (arrnew = []).length = 8192;
        arrnew.fill(0);

        let x0 = tlist[0] * Math.tan(rotangle); y = 0; z = 0;
        x = x0;
        rays0(alpha, beta, gamma);


        for (let j = 0; j < 40; j++) {
            for (let i = -2; i < 3; i++) {
                //pick a ray
                x = x0 + i / 4; y = 0; z = 0;
                let xa = -aprad + 2 * Math.random() * aprad;
                let ya = -aprad + 2 * Math.random() * aprad;
                if (xa * xa + ya * ya < aprad2) {
                    alpha = -(x - xa) / Math.sqrt((xa - x) * (xa - x) + tlist[0] * tlist[0]);
                    beta = -(y - ya) / Math.sqrt((ya - y) * (ya - y) + tlist[0] * tlist[0]);
                    gamma = Math.sqrt(1 - alpha * alpha - beta * beta);
                    rays(alpha, beta, gamma);
                }
            }

            for (let i = -2; i < 3; i++) {
                //pick a ray
                if (i != 0) {
                    x = x0; y = i / 4; z = 0;
                    let xa = -aprad + 2 * Math.random() * aprad;
                    let ya = -aprad + 2 * Math.random() * aprad;
                    if (xa * xa + ya * ya < aprad2) {
                        alpha = -(x - xa) / Math.sqrt((xa - x) * (xa - x) + tlist[0] * tlist[0]);
                        beta = -(y - ya) / Math.sqrt((ya - y) * (ya - y) + tlist[0] * tlist[0]);
                        gamma = Math.sqrt(1 - alpha * alpha - beta * beta);
                        rays(alpha, beta, gamma);
                    }
                }
            }
            for (let i = -1; i < 2; i++) {
                x = x0 + 3 / 4; y = i / 4; z = 0;
                let xa = -aprad + 2 * Math.random() * aprad;
                let ya = -aprad + 2 * Math.random() * aprad;
                if (xa * xa + ya * ya < aprad2) {
                    alpha = -(x - xa) / Math.sqrt((xa - x) * (xa - x) + tlist[0] * tlist[0]);
                    beta = -(y - ya) / Math.sqrt((ya - y) * (ya - y) + tlist[0] * tlist[0]);
                    gamma = Math.sqrt(1 - alpha * alpha - beta * beta);
                    rays(alpha, beta, gamma);
                }

                for (let i = -1; i < 2; i++) {
                    x = x0 + i / 4; y = 3 / 4; z = 0;
                    let xa = -aprad + 2 * Math.random() * aprad;
                    let ya = -aprad + 2 * Math.random() * aprad;
                    if (xa * xa + ya * ya < aprad2) {
                        alpha = -(x - xa) / Math.sqrt((xa - x) * (xa - x) + tlist[0] * tlist[0]);
                        beta = -(y - ya) / Math.sqrt((ya - y) * (ya - y) + tlist[0] * tlist[0]);
                        gamma = Math.sqrt(1 - alpha * alpha - beta * beta);
                        rays(alpha, beta, gamma);
                    }
                }
            }

        }
        makeavg();

        let ratio = Math.max(...arrnew);
        if (ratio != 0) {
            arrnew = arrnew.map(v => v / ratio);
        }
        let b;
        for (let i = 0; i < 128; i++) {
            for (let j = 0; j < 64; j++) {
                b = arrnew[j * 128 + i];
                b = Math.pow(b, 1 / 3);
                makeInstance(i, j)
            }
        }
        //reference: http://learnoptics.com/
        function rays(alpha1, beta1, gamma1) {
            let x1, y1, z1, ea, Mz, M2a, costheta, Ta, nu;
            let costhetap, g, alphap, betap, gammap;
            for (let i = 0; i < 3; i++) {
                ea = tlist[i] * gamma1 - (x * alpha1 + y * beta1 + z * gamma1);
                Mz = z + ea * gamma1 - tlist[i];
                M2a = x * x + y * y + z * z - ea * ea + tlist[i] * tlist[i] - 2 * tlist[i] * z;
                costheta = gamma1 * gamma1 - clist[i] * (clist[i] * M2a - 2 * Mz);
                costheta = Math.sqrt(costheta);
                Ta = ea + (clist[i] * M2a - 2 * Mz) / (gamma1 + costheta);
                x1 = x + Ta * alpha1;
                y1 = y + Ta * beta1;
                z1 = z + Ta * gamma1 - tlist[i];
                if (i === 2) {
                    break;
                }
                nu = nlist[i] / nlist[i + 1];
                costhetap = Math.sqrt(1 - nu * nu * (1 - costheta * costheta));
                g = costhetap - nu * costheta;
                alphap = nu * alpha1 - clist[i] * g * x1;
                betap = nu * beta1 - clist[i] * g * y1;
                gammap = Math.sqrt(1 - alphap * alphap - betap * betap);
                x = x1; y = y1; z = z1;
                alpha1 = alphap; beta1 = betap; gamma1 = gammap;
            }
            makearray(-x1, y1);
        }

        function makearray(xi, yi) {
            let i, j;
            let xinew = (xi - xm);
            let yinew = yi;

            i = Math.round(34 * xinew + 68); //arbitrary scale
            j = Math.round(- 34 * yinew + 34);
            if (i >= 0 && j >= 0 && i < 132 && j < 68) {
                arr[j * 132 + i] = arr[j * 132 + i] + 1;
            }
        }

        function makeavg() {
            let temp;
            //different convolutions
            let a = [2, 2 - 2 / 9, 2 - 5 / 9, 0, 0, 0];
            //let a = [2, 2 - 1 / 9, 2 - 2 / 9, 2 - 4 / 9, 2 - 5 / 9, 2 - 8 / 9];
            for (let i = 0; i < 128; i++) {
                for (let j = 0; j < 64; j++) {
                    temp = a[0] * arr[(j + 2) * 132 + i + 2];
                    temp = temp + a[1] * (arr[(j + 2) * 132 + i + 3] + arr[(j + 2) * 132 + i + 1] + arr[(j + 1) * 132 + i + 2] + arr[(j + 3) * 132 + i + 2]);
                    temp = temp + a[2] * (arr[(j + 1) * 132 + i + 3] + arr[(j + 3) * 132 + i + 3] + arr[(j + 1) * 132 + i + 1] + arr[(j + 3) * 132 + i + 1]);
                    //temp = temp + a[3] * (arr[(j + 2) * 132 + i + 4] + arr[(j + 2) * 132 + i] + arr[j * 132 + i + 2] + arr[(j + 4) * 132 + i + 2]);
                    //temp = temp + a[4] * (arr[(j + 1) * 132 + i + 4] + arr[(j + 3) * 132 + i + 4] + arr[(j + 1) * 132 + i] + arr[(j + 3) * 132 + i]);
                    //temp = temp + a[4] * (arr[j * 132 + i + 3] + arr[j * 132 + i + 1] + arr[(j + 4) * 132 + i + 3] + arr[(j + 4) * 132 + i + 1]);
                    //temp = temp + a[5] * (arr[j * 132 + i + 4] + arr[j * 132 + i] + arr[(j + 4) * 132 + i + 4] + arr[(j + 4) * 132 + i]);
                    arrnew[j * 128 + i] = temp;
                }
            }
        }

        function makeInstance(i, j) {
            let col = "rgba(" + 195 + "," + 155 + "," + 39 + ", " + b + ")";
            ctx1.fillStyle = col;
            ctx1.fillRect(i, j, 1, 1)
        }

        function rays0(alpha1, beta1, gamma1) {
            let x1, y1, z1, ea, Mz, M2a, costheta, Ta, nu;
            let costhetap, g, alphap, betap, gammap;
            for (let i = 0; i < 3; i++) {
                ea = tlist[i] * gamma1 - (x * alpha1 + y * beta1 + z * gamma1);
                Mz = z + ea * gamma1 - tlist[i];
                M2a = x * x + y * y + z * z - ea * ea + tlist[i] * tlist[i] - 2 * tlist[i] * z;
                costheta = gamma1 * gamma1 - clist[i] * (clist[i] * M2a - 2 * Mz);
                costheta = Math.sqrt(costheta);
                Ta = ea + (clist[i] * M2a - 2 * Mz) / (gamma1 + costheta);
                x1 = x + Ta * alpha1;
                y1 = y + Ta * beta1;
                z1 = z + Ta * gamma1 - tlist[i];
                if (i === 2) {
                    break;
                }
                nu = nlist[i] / nlist[i + 1];
                costhetap = Math.sqrt(1 - nu * nu * (1 - costheta * costheta));
                g = costhetap - nu * costheta;
                alphap = nu * alpha1 - clist[i] * g * x1;
                betap = nu * beta1 - clist[i] * g * y1;
                gammap = Math.sqrt(1 - alphap * alphap - betap * betap);
                x = x1; y = y1; z = z1;
                alpha1 = alphap; beta1 = betap; gamma1 = gammap;
            }
            xm = -x1;
        }
    }
    screentexture.needsUpdate = true;
    render();
}
