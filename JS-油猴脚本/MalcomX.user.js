// ==UserScript==
// @name         MalcomX（恶意盗号风险！）（功能残缺！）（请勿使用！）
// @namespace    MalcomX - Clone
// @description  You can edit this script to make your own version/updates
// @author       Arc
// @version      2.0.4
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/MalcomX.user.js
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/MalcomX.user.js
// @match        https://tankionline.com/play*
// @match        https://*.tankionline.com/*
// @match        https://3dtank.com/play*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

(() => {
	'use strict';
	var a = {
		497: (a, c, d) => {
			d.d(c, {
				A: () => e
			});
			class e {
				#t = unsafeWindow.config.data.aimBot;
				dirty = false;
				reset() {
					this.dirty = false;
				}
				process() {
					if (unsafeWindow.config.data.shortcuts.state && unsafeWindow.utils.isBindPressed(this.#t)) {
						this.#t.aimBot.bind.state = !this.#t.aimBot.bind.state;
						unsafeWindow.message.send("AimBot", this.#t.aimBot.bind.state);
					}
					this.setAimAssist();
				}
				setAimAssist() {
					if (!this.#t.bind.state && !this.dirty) {
						return;
					}
					if (!localTank.targetingSystem) {
						return
					}
					aimBot.TargetingSystemWithHorizontalAimAssist = aimBot.TargetingSystemWithHorizontalAimAssist ||
						getByIndex(localTank.targetingSystem, -1)?.[0];
					if (!localTank.targetingSystem?.[aimBot.TargetingSystemWithHorizontalAimAssist]) {
						if (aimBot.TargetingSystemWithHorizontalAimAssist) {
							aimBot.TargetingSystemWithHorizontalAimAssist = undefined;
						}
						return
					}
					let m = localTank.targetingSystem[aimBot.TargetingSystemWithHorizontalAimAssist];
					let corrector = 0.017453292;
					let enabled = this.#t.bind.state;
					let b = Object.keys(m)?.[2];
					if (typeof m?.[b] == "boolean") {
						m[b] = enabled;
					}
					let a = Object.keys(m)?.[1];
					let c = Object.keys(m?.[a])?.[0];
					let d = Object.keys(m?.[a])?.[1];
					if (m?.[a]?.[d]) {
						m[a][d] = corrector;
					}
					if (m?.[a]?.[c]) {
						m[a][c] = Math.round(Math.PI / 180 / corrector * this.#t.fov);
					}
					let e = Object.keys(m)?.[0];
					let f = Object.keys(m?.[e])?.[0];
					let g = Object.keys(m?.[e]?.[f])?.[0];
					if (m?.[e]?.[f]?.[g]) {
						let c = m[e][f][g];
						let a = Object.keys(c);
						if (c?.[a?.[1]] && c?.[a?.[2]]) {
							c[a[1]] = enabled ? -Infinity : -0.1745329201221466;
							c[a[2]] = enabled ? Infinity : 0.12217304855585098;
						}
					}
					this.dirty = true;
				}
			}
		},
		580: (a, c, e) => {
			e.d(c, {
				A: () => d
			});
			e(874);
			class d {
				#t = unsafeWindow.config.data.airBreakData;
				#e = false;
				#n = {
					x: 0,
					y: 0,
					z: 0
				};
				tankPhysicsComponent;
				lastPosition = {
					x: 0,
					y: 0,
					z: 0
				};
				#i = 0;
				gg = false
				get state() {
					return this.#e;
				}
				clearVelocity = () => {
					this.tankPhysicsComponent[tankPhysicsComponent.body][body.state][bodyState.angularVelocity][vector3.x] = 0;
					this.tankPhysicsComponent[tankPhysicsComponent.body][body.state][bodyState.angularVelocity][vector3.y] = 0;
					this.tankPhysicsComponent[tankPhysicsComponent.body][body.state][bodyState.angularVelocity][vector3.z] = 0;
					this.tankPhysicsComponent[tankPhysicsComponent.body][body.state][bodyState.velocity][vector3.x] = 0;
					this.tankPhysicsComponent[tankPhysicsComponent.body][body.state][bodyState.velocity][vector3.y] = 0;
					this.tankPhysicsComponent[tankPhysicsComponent.body][body.state][bodyState.velocity][vector3.z] = 0;
				};
				setAirBreakPosition = c => {
					if (this.#t.killZoneData.state) {
						let d = gameMode.battleMapComponent;
						if (!d) {
							return;
						}
						let b = unsafeWindow.utils.getKillZone(d);
						if (c.x !== 0 && c.x >= b.maxX) {
							c.x = b.maxX;
						}
						if (c.y !== 0 && c.y >= b.maxY) {
							c.y = b.maxY;
						}
						if (c.z !== 0 && c.z >= b.maxZ) {
							c.z = b.maxZ;
						}
						if (c.x !== 0 && c.x <= b.minX) {
							c.x = b.minX;
						}
						if (c.y !== 0 && c.y <= b.minY) {
							c.y = b.minY;
						}
						if (c.z !== 0 && c.z <= b.minZ) {
							c.z = b.minZ;
						}
					}
					if (c.x && c.x !== 0) {
						this.#n.x = c.x;
					}
					if (c.y && c.y !== 0) {
						this.#n.y = c.y;
					}
					if (c.z && c.z !== 0) {
						this.#n.z = c.z;
					}
				};
				onAirBreakActivated = () => {
					const b = this.tankPhysicsComponent[tankPhysicsComponent.body][body.state][bodyState.position];
					if (b) {
						this.setAirBreakPosition({
							x: b[vector3.x],
							y: b[vector3.y],
							z: b[vector3.z]
						});
					}
				};
				onAirBreakDeactivated = () => {
					this.clearVelocity();
					this.tankPhysicsComponent[tankPhysicsComponent.body][body.movable] = true;
				};
				toggleState = () => {
					if (this.#e = !this.#e) {
						this.onAirBreakActivated();
					} else {
						this.onAirBreakDeactivated();
					}
					unsafeWindow.message.send("Fly hack", this.state);
				};
				setRayLenght = (b, c) => {
					if (b?.[trackedChassis.params]?.[suspensionParams.maxRayLength]) {
						b[trackedChassis.params][suspensionParams.maxRayLength] = c;
					}
				};
				align = a => {
					const c = this.tankPhysicsComponent[tankPhysicsComponent.body][body.state][bodyState.orientation];
					switch (a) {
						case "noob":
							this.clearVelocity();
							c[quaternion.fromEulerAngles](0, this.#t.flip ? Math.PI : 0, 0);
							break;
						case 0:
							this.tankPhysicsComponent[tankPhysicsComponent.body][body.state][bodyState.angularVelocity][vector3.x] = 0;
							this.tankPhysicsComponent[tankPhysicsComponent.body][body.state][bodyState.angularVelocity][vector3.y] = 0;
							this.tankPhysicsComponent[tankPhysicsComponent.body][body.state][bodyState.velocity][vector3.z] = 0;
							c[quaternion.x] = 0;
							c[quaternion.y] = 0;
							break;
						default:
							this.clearVelocity();
							c[quaternion.fromEulerAngles](this.#t.tilt ? this.#t.flip ? a[followCamera.pathPosition] : -a[followCamera.pathPosition] : 0, this.#t.flip ? Math.PI : 0, a[followCamera.currState][followCameraState.direction]);
					}
				};
				alignTank = b => {
					switch (this.#t.typeData.state) {
						case "airWalk":
							this.align(0);
							break;
						case "default":
							this.align(b);
							break;
						case "noob":
							this.align("noob");
					}
				};
				setSmoothPosition = (d, a, b) => {
					if (this.#t.typeData.state === "default" || this.#t.typeData.state === "noob") {
						d.x += (a.x - d.x) / b;
						d.y += (a.y - d.y) / b;
					}
					d.z += (a.z - d.z) / b;
				};
				setPosition = () => {
					const c = this.tankPhysicsComponent[tankPhysicsComponent.body][body.state][bodyState.position];
					const a = {
						x: c[vector3.x],
						y: c[vector3.y],
						z: c[vector3.z]
					};
					this.setSmoothPosition(a, this.#n, this.#t.smoothData.state);
					c[vector3.x] = a.x;
					c[vector3.y] = a.y;
					c[vector3.z] = a.z;
				};
				getSpeed = a => {
					switch (a) {
						case "forward":
						case "right":
						case "up":
							return this.#t.speedData.state;
						default:
							return -this.#t.speedData.state;
					}
				};
				getRadian = (c, b) => {
					switch (c) {
						case "forward":
						case "back":
							return -b;
						case "left":
						case "right":
							return -(b - Math.PI / 2);
					}
					return 0;
				};
				onMoved = (e, b = 0) => {
					let a = this.getSpeed(e);
					let f = this.getRadian(e, b);
					let c = {
						x: 0,
						y: 0,
						z: 0
					};
					switch (e) {
						case "forward":
						case "back":
						case "left":
						case "right":
							switch (this.#t.typeData.state) {
								case "default":
									c.x = this.#n.x + a * Math.sin(f);
									c.y = this.#n.y + a * Math.cos(f);
									break;
								case "noob":
									if (e === "left" || e === "right") {
										c.x = this.#n.x + a;
									}
									if (e === "forward" || e === "back") {
										c.y = this.#n.y + a;
									}
							}
							break;
						default:
							c.z = this.#n.z + a;
					}
					this.setAirBreakPosition(c);
				};
				keyHandler = a => {
					let b;
					b = this.#t.speedData;
					if (unsafeWindow.utils.isBindPressed(b.inc)) {
						b.state += 10;
						if (b.state > 1000) {
							b.state = 1000;
						}
					}
					if (unsafeWindow.utils.isBindPressed(b.dec)) {
						b.state -= 10;
						if (b.state < 10) {
							b.state = 10;
						}
					}
					b = this.#t.smoothData;
					if (unsafeWindow.utils.isBindPressed(b.inc)) {
						b.state += 1;
						if (b.state > 100) {
							b.state = 100;
						}
					}
					if (unsafeWindow.utils.isBindPressed(b.dec)) {
						b.state -= 1;
						if (b.state < 1) {
							b.state = 1;
						}
					}
					b = this.#t.killZoneData;
					if (unsafeWindow.utils.isBindPressed(b)) {
						b.state = !b.state;
					}
					b = this.#t.typeData;
					if (unsafeWindow.utils.isBindPressed(b.default)) {
						b.state = "default";
					}
					if (unsafeWindow.utils.isBindPressed(b.simple)) {
						b.state = "noob";
					}
					if (unsafeWindow.utils.isBindPressed(b.airWalk)) {
						b.state = "airWalk";
					}
					b = this.#t.movementData;
					switch (this.#t.typeData.state) {
						case "noob":
							if (unsafeWindow.utils.isBindPressed(b.up)) {
								this.onMoved("up");
							}
							if (unsafeWindow.utils.isBindPressed(b.down)) {
								this.onMoved("down");
							}
							if (unsafeWindow.utils.isBindPressed(b.forward)) {
								this.onMoved("forward");
							}
							if (unsafeWindow.utils.isBindPressed(b.back)) {
								this.onMoved("back");
							}
							if (unsafeWindow.utils.isBindPressed(b.left)) {
								this.onMoved("left");
							}
							if (unsafeWindow.utils.isBindPressed(b.right)) {
								this.onMoved("right");
							}
							break;
						case "default":
							let c = this.#t.autoMove;
							if (c.bind.state) {
								if (c.delay && unsafeWindow.packetControl.responseTime >= 550) {
									return;
								}
								let a = this.randomPosition(c);
								this.sendNewPosition(a);
							}
							if (unsafeWindow.utils.isBindPressed(b.forward)) {
								this.onMoved("forward", a);
							}
							if (unsafeWindow.utils.isBindPressed(b.back)) {
								this.onMoved("back", a);
							}
							if (unsafeWindow.utils.isBindPressed(b.left)) {
								this.onMoved("left", a);
							}
							if (unsafeWindow.utils.isBindPressed(b.right)) {
								this.onMoved("right", a);
							}
						case "airWalk":
							if (unsafeWindow.utils.isBindPressed(b.up)) {
								this.onMoved("up");
							}
							if (unsafeWindow.utils.isBindPressed(b.down)) {
								this.onMoved("down");
							}
					}
				};
				randomPosition = d => {
					let e = d.location.value;
					let ok = d.zigzag.bind.state;
					let kk = ok ? 500 : 3000;
					const f = {
						x: 0,
						y: 0,
						z: 0
					};
					let a = gameMode.battleMapComponent;
					let b = unsafeWindow.utils.getKillZone(a);
					if (b) {
						if (e == "under" || e == "both" && Math.floor(Math.random() * 2) + 1 == 1) {
							f.z = b.minZ;
						} else {
							if (ok) {
								f.z = this.gg ? b.maxZ : b.boundMaxZ + 70;
								this.gg = !this.gg
							} else {
								f.z = Math.round(Math.random()) ? b.maxZ : b.boundMaxZ + 500;
							}
						}
						f.x = utils.getUniqueRandomArbitrary(this.lastPosition.x, kk, b.minX, b.maxX);
						f.y = utils.getUniqueRandomArbitrary(this.lastPosition.y, kk, b.minY, b.maxY);
					}
					return f;
				};
				sendCurrentPosition = () => {
					this.tankPhysicsComponent[tankPhysicsComponent.interpolatedPosition][vector3.x] = this.lastPosition.x;
					this.tankPhysicsComponent[tankPhysicsComponent.interpolatedPosition][vector3.y] = this.lastPosition.y;
					this.tankPhysicsComponent[tankPhysicsComponent.interpolatedPosition][vector3.z] = this.lastPosition.z;
					this.lastPosition.x = this.tankPhysicsComponent[tankPhysicsComponent.interpolatedPosition][vector3.x];
					this.lastPosition.y = this.tankPhysicsComponent[tankPhysicsComponent.interpolatedPosition][vector3.y];
					this.lastPosition.z = this.tankPhysicsComponent[tankPhysicsComponent.interpolatedPosition][vector3.z];
				};
				sendNewPosition = b => {
					this.tankPhysicsComponent[tankPhysicsComponent.interpolatedPosition][vector3.x] = b.x;
					this.tankPhysicsComponent[tankPhysicsComponent.interpolatedPosition][vector3.y] = b.y;
					this.tankPhysicsComponent[tankPhysicsComponent.interpolatedPosition][vector3.z] = b.z;
					this.lastPosition.x = this.tankPhysicsComponent[tankPhysicsComponent.interpolatedPosition][vector3.x];
					this.lastPosition.y = this.tankPhysicsComponent[tankPhysicsComponent.interpolatedPosition][vector3.y];
					this.lastPosition.z = this.tankPhysicsComponent[tankPhysicsComponent.interpolatedPosition][vector3.z];
				};
				reset = () => {
					this.#e = false;
					this.tankPhysicsComponent = undefined;
					this.#i = 0;
				};
				process = (b, c) => {
					let shortcuts = unsafeWindow.config.data.shortcuts.state
					if (shortcuts && unsafeWindow.utils.isBindPressed(this.#t.autoMove)) {
						this.#t.autoMove.bind.state = !this.#t.autoMove.bind.state;
						unsafeWindow.message.send("Anti aim", this.#t.autoMove.bind.state);
					}
					if (shortcuts && unsafeWindow.utils.isBindPressed(this.#t.autoMove.zigzag)) {
						this.#t.autoMove.zigzag.bind.state = !this.#t.autoMove.zigzag.bind.state;
						unsafeWindow.message.send("ZigZag", this.#t.autoMove.zigzag.bind.state);
					}
					if (shortcuts && unsafeWindow.utils.isBindPressed(this.#t.autoMove.location)) {
						if (this.#t.autoMove.location.value === "up") {
							this.#t.autoMove.location.value = "under";
							unsafeWindow.message.send("Anti aim Location changed to", "Under the map");
						} else if (this.#t.autoMove.location.value === "under") {
							this.#t.autoMove.location.value = "both";
							unsafeWindow.message.send("Anti aim Location changed to", "Top & Under of the map");
						} else {
							this.#t.autoMove.location.value = "up";
							unsafeWindow.message.send("Anti aim Location changed to", "Top of the map");
						}
					}
					if (this.#e === false) {
						this.setRayLenght(localTank.trackedChassis, 50);
					} else if (this.#t.typeData.state === "airWalk") {
						this.setRayLenght(localTank.trackedChassis, 1e+100);
					}
					if (b && c) {
						this.tankPhysicsComponent = b;
						if (!this.tankPhysicsComponent) {
							return;
						}
						if (unsafeWindow.utils.isBindPressed(this.#t.toggleStateData)) {
							this.toggleState();
						}
						if (this.#e === true) {
							this.keyHandler(c[followCamera.currState][followCameraState.direction]);
							this.alignTank(c);
							this.setPosition();
							this.tankPhysicsComponent[tankPhysicsComponent.body][body.movable] = this.#t.typeData.state === "airWalk";
						}
					}
				};
			}
		},
		75: (d, a, b) => { },
		660: (a, b, d) => {
			d.d(b, {
				A: () => e
			});
			class e {
				#t = unsafeWindow.config.data.bulletTP;
				shot = true;
				index = 0;
				target = undefined;
				username = undefined;
				bulletPath1 = undefined;
				bulletPath2 = undefined;
				toArr1 = undefined;
				toArr2 = undefined;
				toPos1 = undefined;
				toPos2 = undefined;
				toPos3 = undefined;
				toDirc = undefined;
				TPtimeout = false;
				oldSpeed = undefined;
				tempShot = false;
				lastPos = undefined;
				currBulletNumInAir = 0;
				calculateDistances = [];
				log = false;
				setTarget = (c, b) => {
					this.index++;
					this.target = c;
					this.username = b;
				};
				nextTarget = () => {
					let a = utils.getTanks(this.#t.onlyEnemies);
					if (!unsafeWindow.utils.isArrayValid(a)) {
						return;
					}
					if (this.index >= a.length) {
						this.index = 0;
					}
					this.target = a[this.index];
					this.index++;
					let b = unsafeWindow.utils.getUsername(this.target);
					if (typeof b == "string") {
						unsafeWindow.message.send("Bullet teleport target changed to:", b);
						unsafeWindow.menu.selected.bullet = undefined;
						unsafeWindow.utils.debounce((value) => {
							unsafeWindow.menu.selected.bullet = value;
							this.username = b;
						}, 1500)(b);
					}
				};
				clean = () => {
					this.index = 0;
					this.target = undefined;
				};
				reset = () => {
					this.currBulletNumInAir = 0;
					this.oldSpeed = undefined;
					this.bulletPath1 = undefined;
					this.bulletPath2 = undefined;
					this.toArr1 = undefined;
					this.toArr2 = undefined;
					this.toPos1 = undefined;
					this.toPos2 = undefined;
					this.toPos3 = undefined;
					this.toDirc = undefined;
					this.TPtimeout = false;
					this.tempShot = false;
					this.lastPos = undefined;
					this.calculateDistances = [];
					this.log = false
				};
				getKeys = c => {
					if (!this.bulletPath1 || !this.bulletPath2) {
						let a = c;
						for (const e in a) {
							let d = a[e];
							if (!d || typeof d != "object") {
								continue;
							}
							let c = Object.keys(d);
							let f = false;
							for (let b = 0; b < c.length; b++) {
								if (d[c[b]] === 100 || d[c[b]] === 200) {
									f = true;
								}
							}
							if (f) {
								if (typeof d[c[c.length - 1]] == "object") {
									for (let b = 0; b < c.length; b++) {
										if (d[c[b]] === null) {
											f = false;
											break;
										}
									}
								} else {
									for (let b = 0; b < c.length; b++) {
										if (typeof d[c[b]] == "object") {
											f = false;
											break;
										}
									}
								}
							}
							if (f) {
								this.bulletPath1 = e;
								let c = "";
								let f = 0;
								for (const b in d) {
									if (d[b] > f && d[b] <= 70000) {
										c = b;
										f = d[b];
									}
								}
								if (c) {
									this.bulletPath2 = c;
									this.oldSpeed = a[this.bulletPath1][this.bulletPath2];
								}
								break;
							}
						}
					}
					if (!this.toArr1 || !this.toArr2) {
						for (const d in c) {
							let a = c[d];
							for (const b in a) {
								if (a[b]?.length && a[b].length === 1000) {
									this.toArr1 = d;
									break;
								}
							}
							if (this.toArr1) {
								for (const b in a) {
									if (a[b]?.toArray) {
										this.toArr2 = b;
										break;
									}
								}
								break;
							}
						}
					}
					if (this.toArr1 && this.toArr2 && c?.[this.toArr1]?.[this.toArr2]) {
						if (!this.toPos1 || !this.toPos2) {
							let d = c[this.toArr1][this.toArr2].toArray();
							if (d.length > 0) {
								let a = d[0];
								for (const b in a) {
									let e = a[b];
									if (!e || typeof e != "object") {
										continue;
									}
									let c = Object.keys(e);
									if (c.length === 1 && e[c[0]]?.push) {
										this.toPos1 = b;
										this.toPos2 = c[0];
										break;
									}
								}
							}
						}
						if (this.toPos1 && this.toPos2 && !this.toPos3) {
							let a = c[this.toArr1][this.toArr2].toArray();
							if (a.length > 0) {
								let d = a[0][this.toPos1][this.toPos2][1];
								let f = Object.keys(d);
								for (let e = 0; e < f.length; e++) {
									let b = d[f[e]];
									if (!b || typeof b != "object") {
										continue;
									}
									let c = Object.keys(b);
									if (c.length === 3 && c[0] === vector3.x && c[1] === vector3.y && c[2] === vector3.z) {
										this.toPos3 = f[e];
										this.toDirc = f[e + 1];
										break;
									}
								}
							}
						}
					}
				};
				process = h => {
					let b = unsafeWindow.config.data.shortcuts.state;
					if (b && this.#t.activate.bind.state && unsafeWindow.utils.isBindPressed(this.#t.hitTarget)) {
						this.shot = true;
					}
					if (b && this.#t.activate.bind.state && unsafeWindow.utils.isBindPressed(this.#t.changeTarget)) {
						this.nextTarget();
					}
					if (b && unsafeWindow.utils.isBindPressed(this.#t.activate)) {
						this.#t.activate.bind.state = !this.#t.activate.bind.state;
						unsafeWindow.message.send("Bullet teleport", this.#t.activate.bind.state);
					}
					const a = localTank.shellFactory;
					if (!a) {
						return;
					}
					if (!this.#t.activate.bind.state) {
						if (a?.[this.bulletPath1]?.[this.bulletPath2] !== undefined && this.oldSpeed !== undefined) {
							a[this.bulletPath1][this.bulletPath2] = this.oldSpeed;
							this.reset();
						}
						return;
					}
					if (!this.bulletPath1 || !this.bulletPath2 || !a?.[this.bulletPath1]?.[this.bulletPath2]) {
						this.getKeys(a);
						return;
					}
					a[this.bulletPath1][this.bulletPath2] = 1e-100;
					if (!this.toArr1 || !this.toArr2 || !this.toPos1 || !this.toPos2 || !this.toPos3 || !this.toDirc) {
						this.getKeys(a);
						return;
					}
					if ((this.target === undefined || this.target?.length === 0) && !!this.username) {
						this.target = unsafeWindow.utils.getTankByUsername(this.username);
					}
					let j = localTank.tankphysics(this.target)?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.position];
					let c = a[this.toArr1][this.toArr2].toArray();
					this.currBulletNumInAir = c.length
					if (c.length >= 1) {
						c.forEach(b => {
							b[this.toPos1][this.toPos2][1][this.toDirc][vector3.x] = 0;
							b[this.toPos1][this.toPos2][1][this.toDirc][vector3.y] = 0;
						});
						if (this.#t.autoShot && c.length >= this.#t.bulletNumber) {
							this.shot = true;
						}
						if (localTank.othersTankComponent(this.target)?.[playerStatus.path]?.[playerStatus.status] != 'ACTIVE') {
							return
						}
						if (j && this.#t.bulletNumber === 1 && !this.TPtimeout && h?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.position]?.[vector3.z]) {
							this.TPtimeout = true;
							let d = h[tankPhysicsComponent.body][body.state][bodyState.position];
							let e = Math.floor(j[vector3.x] - d[vector3.x]);
							let f = Math.floor(j[vector3.y] - d[vector3.y]);
							let g = Math.sqrt(e * e + f * f);
							if (g > this.oldSpeed) {
								g = this.oldSpeed;
							}
							let a = Math.floor(g / this.oldSpeed * 1000);
							setTimeout(() => {
								c.forEach(b => {
									let a = b[this.toPos1][this.toPos2][1][this.toPos3];
									a[vector3.x] = j[vector3.x];
									a[vector3.y] = j[vector3.y];
									a[vector3.z] = j[vector3.z];
								});
								setTimeout(() => {
									this.TPtimeout = false;
								}, 50);
							}, a);
						} else if (j && this.shot) {
							a[this.bulletPath1][this.bulletPath2] = 1e+100;
							this.shot = false;
							for (let e = 0; e < c.length && e !== this.#t.bulletNumber; e++) {
								let a = c[e][this.toPos1][this.toPos2][1][this.toPos3];
								a[vector3.x] = j[vector3.x]
								a[vector3.y] = j[vector3.y]
								a[vector3.z] = j[vector3.z]
							}
						}
					}
				};
			}
		},
		360: (a, c, e) => {
			e.d(c, {
				A: () => g
			});
			let d = "";
			let f = "";
			class g {
				#o = 1500;
				#i = false;
				#a = false;
				#s;
				#t = unsafeWindow.config.data.cameraData;
				#r = unsafeWindow.config.data.spectateData;
				spectateBody;
				index = 0;
				reset = () => {
					this.#i = false;
					this.#s = undefined;
					this.spectateBody = undefined;
					this.index = 0;
				};
				clean = () => {
					this.index = 0;
					this.spectateBody = undefined;
				};
				spectate = b => {
					this.index++;
					this.spectateBody = localTank.tankphysics(b)?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.position];
				};
				deactivate = () => {
					this.spectateBody = undefined;
				};
				distance = () => {
					if (this.#t.state) {
						this.#o += 1000;
						if (this.#o > 2500) {
							this.#o = 500;
						}
					}
				};
				nextTarget = () => {
					if (!this.#i || !this.#r.bind.state) {
						return;
					}
					let b = utils.getTanks(this.#r.onlyEnemies);
					if (!unsafeWindow.utils.isArrayValid(b)) {
						return;
					}
					if (this.index >= b.length) {
						this.index = 0;
					}
					let c = b[this.index];
					this.spectateBody = localTank.tankphysics(c)?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.position];
					this.index++;
					let d = unsafeWindow.utils.getUsername(c);
					if (typeof d == "string") {
						unsafeWindow.message.send("Spectate target changed to:", d);
						unsafeWindow.menu.selected.spectate = d;
					}
				};
				process = c => {
					if (unsafeWindow.config.data.shortcuts.state && unsafeWindow.utils.isBindPressed(this.#r)) {
						this.nextTarget();
					}
					this.distance();
					if (this.#i) {
						return;
					}
					if (!c) {
						return;
					}
					if (!this.#i && c[followCamera.pitch]?.copy) {
						return this.#i = true;
					}
					function e(d, a, b) {
						if (d < a) {
							return a;
						} else if (d > b) {
							return b;
						} else {
							return d;
						}
					}
					this.#s = c;
					c[followCamera.polarDistance].copy = c[followCamera.polarDistance][dampedSpring.update];
					c[followCamera.pitch].copy = c[followCamera.pitch][dampedSpring.update];
					c[followCamera.elevation].copy = c[followCamera.elevation][dampedSpring.update];
					c[followCamera.pivot].copy = c[followCamera.pivot][dampedSpring.pivot];
					c.copy = c[followCamera.updatePath];
					c[followCamera.updatePath] = function (a) {
						if (unsafeWindow.cameraHack.#t.state === false || !document.pointerLockElement) {
							return this.copy(a);
						}
						const b = e(a, -Math.PI / 2, Math.PI / 2);
						this[followCamera.pathPointElevation] = this[followCamera.pathPosition] = b;
						this[followCamera.pathPositionOffset] = e(this[followCamera.pathPositionOffset], -b, 1 - b);
					};
					c[followCamera.polarDistance][dampedSpring.update] = function (c, a) {
						if (unsafeWindow.cameraHack.#t.state === false || !document.pointerLockElement) {
							return this.copy(c, a);
						}
						this[dampedSpring.value] += (unsafeWindow.cameraHack.#o - this[dampedSpring.value]) / 20;
					};
					c[followCamera.pitch][dampedSpring.update] = function (d, a) {
						if (unsafeWindow.cameraHack.#t.state === false || !document.pointerLockElement) {
							return this.copy(d, a);
						}
						this[dampedSpring.value] = c[followCamera.pathPosition];
					};
					c[followCamera.elevation][dampedSpring.update] = function (d, a) {
						if (unsafeWindow.cameraHack.#t.state === false || !document.pointerLockElement) {
							return this.copy(d, a);
						}
						this[dampedSpring.value] = c[followCamera.pathPosition] + 0.3;
					};
					c[followCamera.pivot][dampedSpring.pivot] = function (c, b) {
						this.copy(c, unsafeWindow.cameraHack?.spectateBody ? unsafeWindow.cameraHack.spectateBody : b);
					};
					if (this.#a !== true) {
						document.addEventListener("mousemove", a => {
							if (this.#t.state !== false && this.#s && document.pointerLockElement) {
								this.#s[followCamera.pathPosition] += a.movementY * 0.000525;
								c[followCamera.updatePath](this.#s[followCamera.pathPosition]);
							}
						}, false);
						this.#a = true;
					}
					const b = Object.entries(this.#s)?.[22]?.[1];
					if (b) {
						f = Object.entries(b.__proto__)[1][0];
						f ||= Object.entries(b.__proto__)[0][0];
						b.copy ||= b[f];
						b[f] = function (b) {
							d = Object.entries(b)[0][0];
							this.copy(b);
							if (unsafeWindow.config.data.cameraData.state) {
								b[d] = unsafeWindow.config.data.cameraData.fov;
							}
						};
						this.#i = true;
					}
				};
			}
		},
		384: (a, c, e) => {
			e.d(c, {
				A: () => d
			});
			class d {
				#t = unsafeWindow.config.data.clickerData;
				supplies = ["autoArmorData", "autoDamageData", "autoHealingData", "autoMiningData", "autoNitroData"];
				nextTime = {};
				constructor() {
					setInterval(this.run);
				}
				run = () => {
					for (let a = 0; a < this.supplies.length; a++) {
						let b = this.supplies[a];
						if (this.#t[b].state) {
							this.activateSupply(b);
						}
					}
				};
				activateSupply = b => {
					if (this.#t[b].delay !== 0) {
						if (this.nextTime[b] && this.nextTime[b] > Date.now()) {
							return;
						}
						this.nextTime[b] = Date.now() + this.#t[b].delay;
					}
					this.pressKey(this.#t[b].code);
				};
				cyrb53 = (f, b = 0) => {
					let a = b ^ 3735928559;
					let g = b ^ 1103547991;
					for (let d, c = 0; c < f.length; c++) {
						d = f.charCodeAt(c);
						a = Math.imul(a ^ d, 2654435761);
						g = Math.imul(g ^ d, 1597334677);
					}
					a = Math.imul(a ^ a >>> 16, 2246822507);
					a ^= Math.imul(g ^ g >>> 13, 3266489909);
					g = Math.imul(g ^ g >>> 16, 2246822507);
					g ^= Math.imul(a ^ a >>> 13, 3266489909);
					return String((g & 2097151) * 4294967296 + (a >>> 0));
				};
				readDataView = c => {
					const b = Array.from(new Int8Array(c.buffer));
					let a = "";
					for (let d = 0; d < c.byteLength; d++) {
						a += String(b[d]);
					}
					return this.cyrb53(a);
				};
				pressKey = b => {
					dispatchEvent(new KeyboardEvent("keydown", {
						code: b
					}));
					dispatchEvent(new KeyboardEvent("keyup", {
						code: b
					}));
				};
				reset = () => { };
				process = () => {
					if (unsafeWindow.config.data.shortcuts.state && unsafeWindow.utils.isBindPressed(this.#t.autoMiningData)) {
						this.#t.autoMiningData.state = !this.#t.autoMiningData.state;
						unsafeWindow.message.send("Mines clicker", this.#t.autoMiningData.state);
					}
					if (unsafeWindow.config.data.shortcuts.state && unsafeWindow.utils.isBindPressed(this.#t.autoHealingData)) {
						this.#t.autoHealingData.state = !this.#t.autoHealingData.state;
						unsafeWindow.message.send("Repair Kit", this.#t.autoHealingData.state);
					}
					if (unsafeWindow.config.data.shortcuts.state && unsafeWindow.utils.isBindPressed(this.#t.autoArmorData)) {
						this.#t.autoArmorData.state = !this.#t.autoArmorData.state;
						unsafeWindow.message.send("Boosted Armor", this.#t.autoArmorData.state);
					}
					if (unsafeWindow.config.data.shortcuts.state && unsafeWindow.utils.isBindPressed(this.#t.autoDamageData)) {
						this.#t.autoDamageData.state = !this.#t.autoDamageData.state;
						unsafeWindow.message.send("Boosted Damage", this.#t.autoDamageData.state);
					}
					if (unsafeWindow.config.data.shortcuts.state && unsafeWindow.utils.isBindPressed(this.#t.autoNitroData)) {
						this.#t.autoNitroData.state = !this.#t.autoNitroData.state;
						unsafeWindow.message.send("Speed Boost", this.#t.autoNitroData.state);
					}
				};
			}
		},
		537: (a, b, d) => {
			d.d(b, {
				A: () => e
			});
			class e {
				#t = unsafeWindow.config.data.antiKick;
				constructor() {
					setInterval(this.sendAlive, 30000);
				}
				sendAlive = () => {
					if (!this.#t.state) {
						return;
					}
					let j = localTank.trackedChassis;
					if (!j) {
						return;
					}
					let d = getByIndex(j, 4)?.[0];
					let c = getByIndex(j?.[d], 0)?.[0];
					let a = getByIndex(j?.[d], 1)?.[0];
					let b = getByIndex(j?.[d], 2)?.[0];
					let e = getByIndex(j, 5)?.[0];
					let f = getByIndex(j?.[e], 0)?.[0];
					let g = getByIndex(j?.[e], 1)?.[0];
					let h = getByIndex(j?.[e], 2)?.[0];
					if (a && c && b) {
						localTank.trackedChassis[d][a] = 0;
						localTank.trackedChassis[d][a] = 1;
						localTank.trackedChassis[d][c] = 0;
						localTank.trackedChassis[d][c] = 1;
						localTank.trackedChassis[d][b] = true;
					}
					if (g && f && h) {
						localTank.trackedChassis[e][g] = 0;
						localTank.trackedChassis[e][g] = 1;
						localTank.trackedChassis[e][g] = 0;
						localTank.trackedChassis[e][g] = 1;
						localTank.trackedChassis[e][h] = true;
					}
				};
				reset = () => { };
			}
		},
		905: (a, c, d) => {
			d.d(c, {
				A: () => e
			});
			class e {
				#t = unsafeWindow.config.data.otherData;
				#l = true;
				#d = undefined;
				#x = false;
				#f = undefined;
				gg = false
				reset = () => {
					this.#l = true;
					this.#d = undefined;
					this.#x = false;
					this.#f = undefined;
				};
				freezeTank = a => {
					let b = localTank.tankphysics(a);
					if (b && b[tankPhysicsComponent.body]) {
						if (this.#t.freezeTanks.bind.state) {
							b[tankPhysicsComponent.body][body.movable] = false;
							b[tankPhysicsComponent.body][body.state][bodyState.angularVelocity][vector3.x] = 0;
							b[tankPhysicsComponent.body][body.state][bodyState.angularVelocity][vector3.y] = 0;
							b[tankPhysicsComponent.body][body.state][bodyState.angularVelocity][vector3.z] = 0;
							b[tankPhysicsComponent.body][body.state][bodyState.velocity][vector3.x] = 0;
							b[tankPhysicsComponent.body][body.state][bodyState.velocity][vector3.y] = 0;
							b[tankPhysicsComponent.body][body.state][bodyState.velocity][vector3.z] = 0;
						} else {
							b[tankPhysicsComponent.body][body.movable] = true;
						}
					}
				};
				hitArea = a => {
					let b = localTank.tankphysics(a);
					let x = 9.75 / 3;
					if (b && b?.[tankPhysicsComponent.mainHull]?.[body.hitArea]) {
						if (this.#t.hitArea.bind.state) {
							if (!b[tankPhysicsComponent.mainHull][body.hitArea]?.dirty) {
								b[tankPhysicsComponent.mainHull][body.hitArea][vector3.z] = b[tankPhysicsComponent.mainHull][body.hitArea][vector3.z] * x
								b[tankPhysicsComponent.mainHull][body.hitArea][vector3.x] = b[tankPhysicsComponent.mainHull][body.hitArea][vector3.x] * x
								b[tankPhysicsComponent.mainHull][body.hitArea][vector3.y] = b[tankPhysicsComponent.mainHull][body.hitArea][vector3.y] * x
								b[tankPhysicsComponent.mainHull][body.hitArea].dirty = true;
							}
						} else {
							if (b[tankPhysicsComponent.mainHull][body.hitArea]?.dirty) {
								b[tankPhysicsComponent.mainHull][body.hitArea][vector3.z] = b[tankPhysicsComponent.mainHull][body.hitArea][vector3.z] / x
								b[tankPhysicsComponent.mainHull][body.hitArea][vector3.x] = b[tankPhysicsComponent.mainHull][body.hitArea][vector3.x] / x
								b[tankPhysicsComponent.mainHull][body.hitArea][vector3.y] = b[tankPhysicsComponent.mainHull][body.hitArea][vector3.y] / x
								delete b[tankPhysicsComponent.mainHull][body.hitArea].dirty;
							}
						}
					}
				};
				nameDistance = a => {
					let b = localTank.userTitle(a);
					if (b) {
						if (!userTitleConfiguration.name) {
							unsafeWindow.utils.getUsername(a);
						}
						getName(userTitleComponent, "currentAlpha", "userTitleComponent", b, 10);
						getName(userTitleComponent, "userNameBar", "userTitleComponent", b, 16);
						getName(userNameBar, "renderStage", "userNameBar", b?.[userTitleComponent.userNameBar], 15);
						getName(renderStage, "ordinal", "renderStage", b?.[userTitleComponent.userNameBar]?.[userNameBar.renderStage], 1);
						if (b?.[userTitleComponent.userNameBar]?.[userNameBar.renderStage]?.[renderStage.ordinal]) {
							b[userTitleComponent.currentAlpha] = this.#t.showUsernames.bind.state;
							b[userTitleComponent.userNameBar][userNameBar.renderStage][renderStage.ordinal] = 25;
						}
					}
				};
				jump = c => {
					if (!unsafeWindow.config.data.stickData.nextTargetData.bind.state && !unsafeWindow.config.data.airBreakData.toggleStateData.bind.state && c?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.position]?.[vector3.z]) {
						let b = c[tankPhysicsComponent.body][body.state];
						b[bodyState.position][vector3.z] += 500;
						b[bodyState.orientation][quaternion.x] = 0;
						b[bodyState.orientation][quaternion.y] = 0;
					}
				};
				avoidMines = f => {
					if (unsafeWindow.config.data.stickData.nextTargetData.bind.state ||
						unsafeWindow.config.data.syncData.verticalAntiAim.bind.state ||
						airBreak.state) {
						return;
					}
					let e = unsafeWindow.config.data.syncData.antiMineData;
					if (!e.bind.state) {
						return;
					}
					if (!f?.[tankPhysicsComponent.interpolatedPosition]?.[vector3.z]) {
						return;
					}
					let d = gameMode.battleMapComponent;
					if (!d) {
						return;
					}
					let a = utils.getKillZone(d);
					let b = f[tankPhysicsComponent.interpolatedPosition][vector3.z] + e.height;
					if (b !== 0 && b >= a.maxZ) {
						b = a.maxZ;
					}
					f[tankPhysicsComponent.interpolatedPosition][vector3.z] = b;
				};
				verticalAntiAim(p) {
					if (unsafeWindow.config.data.stickData.nextTargetData.bind.state) {
						return;
					}
					let data = unsafeWindow.config.data.syncData.verticalAntiAim;
					if (!data.bind.state) {
						return;
					}
					if (!p?.[tankPhysicsComponent.interpolatedPosition]?.[vector3.z]) {
						return;
					}
					let bb = gameMode.battleMapComponent;
					if (!bb) {
						return;
					}
					let cc = utils.getKillZone(bb);
					let dd = p[tankPhysicsComponent.body][body.state][bodyState.position]
					let ee = {
						x: dd[vector3.x],
						y: dd[vector3.y],
						z: this.gg ? cc.maxZ : dd[vector3.z] + 100
					};
					this.gg = !this.gg;
					if (ee.y !== 0 && ee.y >= cc.maxY) {
						ee.y = cc.maxY;
					}
					if (ee.z !== 0 && ee.z >= cc.maxZ) {
						ee.z = cc.maxZ;
					}
					if (ee.x !== 0 && ee.x <= cc.minX) {
						ee.x = cc.minX;
					}
					if (ee.y !== 0 && ee.y <= cc.minY) {
						ee.y = cc.minY;
					}
					if (ee.z !== 0 && ee.z <= cc.minZ) {
						ee.z = cc.minZ;
					}
					p[tankPhysicsComponent.interpolatedPosition][vector3.z] = ee.z;
				};
				flagTeleport = j => {
					let c = unsafeWindow.config.data.flagTeleportData;
					if (c.bind.state && this.#l) {
						let d;
						let a;
						this.#l = false;
						let b = gameMode.captureFlagComponent;
						getName(flags, "flagPath", "flagPath", b, 1);
						getName(flags, "flagPath1", "flagPath1", b?.[flags.flagPath], 1);
						getName(flags, "flagPath2", "flagPath2", b?.[flags.flagPath]?.[flags.flagPath1], 9);
						getName(flags, "flagsData", "flagsData", b?.[flags.flagPath]?.[flags.flagPath1]?.[flags.flagPath2], 0);
						let k = b?.[flags.flagPath]?.[flags.flagPath1]?.[flags.flagPath2]?.[flags.flagsData];
						if (!k) {
							return;
						}
						let l = getByIndex(k[0], 6)?.[0];
						let m = getByIndex(k[0]?.[l], 0)?.[0];
						let e = getByIndex(k[0], -5)?.[0];
						let f = {
							x: getByIndex(k[0][e], 0)?.[0],
							y: getByIndex(k[0][e], 1)?.[0],
							z: getByIndex(k[0][e], 2)?.[0]
						};
						if (!j?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.position]) {
							return;
						}
						let g = j[tankPhysicsComponent.body][body.state];
						if (!k[1]?.[e]?.[f.x] || !m) {
							return;
						}
						let h = localTank.tankComponent?.[playerStatus.teamObj]?.[playerStatus.team];
						if (h != "TEAM_B") {
							a = k[0];
							d = k[1];
						} else {
							a = k[1];
							d = k[0];
						}
						if (d[l][m] == "AT_BASE" && a[l][m] != "CARRIED") {
							g[bodyState.position][vector3.x] = a[e][f.x];
							g[bodyState.position][vector3.y] = a[e][f.y];
							g[bodyState.position][vector3.z] = a[e][f.z];
							setTimeout(() => {
								if (c.bind.state) {
									g[bodyState.position][vector3.x] = d[e][f.x];
									g[bodyState.position][vector3.y] = d[e][f.y];
									g[bodyState.position][vector3.z] = d[e][f.z];
								}
							}, 200);
						}
						setTimeout(() => {
							this.#l = true;
						}, c.cooldown);
					}
				};
				boxTeleport = (f, g) => {
					if (!unsafeWindow.config.data.otherData.boxTeleport.bind.state) {
						return;
					}
					let h = f?.[tankPhysicsComponent.body][body.state];
					let i = world.triggers;
					if (!h || !i) {
						return;
					}
					let b = getByIndex(i, 0)?.[0];
					let a = getByIndex(i?.[b], 0)?.[0];
					if (!a) {
						return;
					}
					let c = i[b][a];
					if (typeof c != "object" || c.length === 0) {
						return;
					}
					let j = g?.[followCamera.currState]?.[followCameraState.direction] || 1;
					for (const e of c) {
						if (Object.entries(e).length !== 4) {
							continue;
						}
						let b = getByIndex(e, 3)?.[0];
						let a = getByIndex(e?.[b], 9)?.[0];
						if (!a) {
							continue;
						}
						let c = e[b][a];
						let x1 = (getByIndex(c, 0)?.[1] + getByIndex(c, 3)?.[1]) / 2;
						let y1 = (getByIndex(c, 1)?.[1] + getByIndex(c, 4)?.[1]) / 2;
						let z1 = (getByIndex(c, 2)?.[1] + getByIndex(c, 5)?.[1]) / 2;
						let cor = {
							x: x1,
							y: y1,
							z: z1
						}
						if (typeof cor.x == "number" && typeof cor.y == "number" && typeof cor.z == "number") {
							h[bodyState.position][vector3.x] = cor.x;
							h[bodyState.position][vector3.y] = cor.y;
							h[bodyState.position][vector3.z] = cor.z;
							h[bodyState.orientation][quaternion.w] = Math.sin(-(j - Math.PI) / 2);
							h[bodyState.orientation][quaternion.z] = Math.cos(-(j - Math.PI) / 2);
							h[bodyState.orientation][quaternion.x] = 0;
							h[bodyState.orientation][quaternion.y] = 0;
							h[bodyState.angularVelocity][vector3.x] = 0;
							h[bodyState.angularVelocity][vector3.y] = 0;
							h[bodyState.angularVelocity][vector3.z] = 0;
							h[bodyState.velocity][vector3.x] = 0;
							h[bodyState.velocity][vector3.y] = 0;
							h[bodyState.velocity][vector3.z] = 0;
						}
					}
				};
				autoShot = () => {
					let b = localTank.weaponTrigger;
					getName(weaponTrigger, "pressed", "weaponTrigger", b, 5);
					getName(weaponTrigger, "pulled", "weaponTrigger", b, 6);
					if (this.#f && this.#f > Date.now()) {
						return;
					} else {
						this.#f = Date.now() + 50
					}
					if (!b || (!this.#t.autoShot.bind.state && !this.#x)) {
						return
					}
					if (this.#t.autoShot.bind.state) {
						b[unsafeWindow.weaponTrigger.pulled] = true;
						this.#x = true;
					} else {
						b[unsafeWindow.weaponTrigger.pulled] = false;
						this.#x = false;
					}
				};
				speedHack = () => {
					if (this.#t.speedHack.bind.state || this.#d !== undefined) {
						getName(speed, "path1", "path1", localTank?.speedCharacteristicsComponent, -1);
						getName(speed, "path2", "path2", localTank?.speedCharacteristicsComponent?.[speed.path1], 4);
						getName(speed, "path3", "path3", localTank?.speedCharacteristicsComponent?.[speed.path1]?.[speed.path2], 3);
						getName(speed, "path4", "path4", localTank?.speedCharacteristicsComponent?.[speed.path1]?.[speed.path2]?.[speed.path3], 3);
						if (!localTank?.speedCharacteristicsComponent?.[speed.path1]?.[speed.path2]?.[speed.path3]?.[speed.path4]) {
							return this.#d = undefined;
						}
						if (this.#t.speedHack.bind.state) {
							if (this.#d) {
								localTank.speedCharacteristicsComponent[speed.path1][speed.path2][speed.path3][speed.path4] = this.#t.speedHack.value * this.#d;
							} else {
								this.#d = localTank.speedCharacteristicsComponent[speed.path1][speed.path2][speed.path3][speed.path4];
							}
						} else if (this.#d) {
							localTank.speedCharacteristicsComponent[speed.path1][speed.path2][speed.path3][speed.path4] = this.#d;
							this.#d = undefined;
						}
					}
				};
				autoHealing = () => {
					let a = this.#t.autoHealingClicker;
					if (!a.bind.state) {
						return;
					}
					let b = localTank.healthComponent;
					if (b) {
						heal.total ||= getByIndex(b, 4)?.[0];
						heal.current ||= getByIndex(b, 5)?.[0];
						if (typeof b?.[heal.current] == "number" && typeof b?.[heal.total] == "number" && b[heal.total] != b[heal.current] && b[heal.current] / b[heal.total] * 100 <= a.percentage) {
							clicker.activateSupply("autoHealingData");
						}
					}
				};
				process = (d, b) => {
					const e = unsafeWindow.utils.getTanks();
					if (unsafeWindow.utils.isArrayValid(e)) {
						for (const a of e) {
							this.hitArea(a);
							this.freezeTank(a);
							this.nameDistance(a);
						}
					}
					this.autoHealing();
					this.avoidMines(d);
					this.verticalAntiAim(d);
					this.autoShot();
					this.boxTeleport(d, b);
					this.flagTeleport(d);
					this.speedHack();
					let a = unsafeWindow.config.data.shortcuts.state;
					let s = unsafeWindow.config.data.syncData;
					if (a && unsafeWindow.utils.isBindPressed(s.antiMineData)) {
						s.antiMineData.bind.state = !s.antiMineData.bind.state;
						unsafeWindow.message.send("Walk on mines", s.antiMineData.bind.state);
					}
					if (a && unsafeWindow.utils.isBindPressed(s.verticalAntiAim)) {
						s.verticalAntiAim.bind.state = !s.verticalAntiAim.bind.state;
						unsafeWindow.message.send("Vertical AntiAim", s.verticalAntiAim.bind.state);
					}
					if (a && unsafeWindow.utils.isBindPressed(this.#t.autoHealingClicker)) {
						this.#t.autoHealingClicker.bind.state = !this.#t.autoHealingClicker.bind.state;
						unsafeWindow.message.send("Auto healing", this.#t.autoHealingClicker.bind.state);
					}
					if (a && unsafeWindow.utils.isBindPressed(this.#t.autoShot)) {
						this.#t.autoShot.bind.state = !this.#t.autoShot.bind.state;
						unsafeWindow.message.send("Auto shot", this.#t.autoShot.bind.state);
					}
					if (a && unsafeWindow.utils.isBindPressed(this.#t.freezeTanks)) {
						this.#t.freezeTanks.bind.state = !this.#t.freezeTanks.bind.state;
						unsafeWindow.message.send("Freeze tanks", this.#t.freezeTanks.bind.state);
					}
					if (a && unsafeWindow.utils.isBindPressed(this.#t.showUsernames)) {
						this.#t.showUsernames.bind.state = !this.#t.showUsernames.bind.state;
						unsafeWindow.message.send("Show usernames", this.#t.showUsernames.bind.state);
					}
					if (a && unsafeWindow.utils.isBindPressed(unsafeWindow.config.data.flagTeleportData)) {
						unsafeWindow.config.data.flagTeleportData.bind.state = !unsafeWindow.config.data.flagTeleportData.bind.state;
						unsafeWindow.message.send("Flag teleport", unsafeWindow.config.data.flagTeleportData.bind.state);
					}
					if (a && unsafeWindow.utils.isBindPressed(this.#t.boxTeleport)) {
						this.#t.boxTeleport.bind.state = !this.#t.boxTeleport.bind.state;
						unsafeWindow.message.send("Box teleport", this.#t.boxTeleport.bind.state);
					}
					if (a && unsafeWindow.utils.isBindPressed(this.#t.speedHack)) {
						this.#t.speedHack.bind.state = !this.#t.speedHack.bind.state;
						unsafeWindow.message.send("Speed hack", this.#t.speedHack.bind.state);
					}
					if (a && unsafeWindow.utils.isBindPressed(unsafeWindow.config.data.otherData.hitArea)) {
						unsafeWindow.config.data.otherData.hitArea.bind.state = !unsafeWindow.config.data.otherData.hitArea.bind.state;
						unsafeWindow.message.send("Expand hit area", unsafeWindow.config.data.otherData.hitArea.bind.state);
					}
					if (a && unsafeWindow.utils.isBindPressed(this.#t.jump)) {
						this.jump(d);
					}
				};
			}
		},
		566: (a, c, d) => {
			d.d(c, {
				A: () => e
			});
			class e {
				#t = unsafeWindow.config.data.physics;
				ignoreTanksDirty = false;
				noKnockbackDirty = false;
				oldPhysicsDirty = false;
				values = {
					gravity: undefined,
					mass: undefined,
					recoil: undefined,
					oldPhysics: {}
				};
				fakeLagData = {
					temp: false,
					position: {
						x: 0,
						y: 0,
						z: 0
					}
				};
				reset = () => {
					this.ignoreTanksDirty = false;
					this.noKnockbackDirty = false;
					this.oldPhysicsDirty = false;
					this.values = {
						gravity: undefined,
						mass: undefined,
						recoil: undefined,
						oldPhysics: {}
					};
					this.fakeLagData = {
						temp: false,
						position: {
							x: 0,
							y: 0,
							z: 0
						}
					};
				};
				oldPhysics = () => {
					if (!localTank.hoverChassisParams) {
						return;
					}
					if (this.#t.oldPhysics.bind.state || this.oldPhysicsDirty) {
						oldPhysics.tiltStabilityMaxAngle = oldPhysics.tiltStabilityMaxAngle || Object.keys(localTank.hoverChassisParams)?.[2];
						if (localTank.hoverChassisParams[oldPhysics.tiltStabilityMaxAngle]) {
							if (!this.#t.oldPhysics.bind.state && this.oldPhysicsDirty) {
								for (const key in this.values.oldPhysics) {
									if (localTank.hoverChassisParams.hasOwnProperty(key)) {
										localTank.hoverChassisParams[key] = this.values.oldPhysics[key];
									}
								}
								localTank.hoverChassisParams[oldPhysics.tiltStabilityMaxAngle] = 6.2831854820251465
								this.oldPhysicsDirty = false;
							}
							if (this.#t.oldPhysics.bind.state) {
								let entries = Object.entries(localTank.hoverChassisParams);
								for (const [key, value] of entries) {
									if (!this.values.oldPhysics.hasOwnProperty(key)) {
										this.values.oldPhysics[key] = value;
									}
									if ([5, 3, 7].includes(value)) {
										localTank.hoverChassisParams[key] = 10;
									}
								}
								localTank.hoverChassisParams[oldPhysics.tiltStabilityMaxAngle] = 1;
								this.oldPhysicsDirty = true;
							}
						}
					}
				};
				noTilt = (b, c) => {
					if (c || !this.#t.noTilt.bind.state) {
						return;
					}
					if (!b?.[body.state]) {
						return;
					}
					let a = b[body.state];
					if (a?.[bodyState.orientation] && a?.[bodyState.angularVelocity]) {
						a[bodyState.orientation][quaternion.x] = 0;
						a[bodyState.angularVelocity][vector3.x] = 0;
						a[bodyState.orientation][quaternion.y] = 0;
						a[bodyState.angularVelocity][vector3.y] = 0;
					}
				};
				noFlip = (b, c) => {
					if (c || !this.#t.noFlip.bind.state || this.#t.noTilt.bind.state) {
						return;
					}
					if (!b?.[body.state]) {
						return;
					}
					let v = this.#t.noFlip.value
					let a = b[body.state];
					if (Math.abs(a[bodyState.orientation][quaternion.x]) > v) {
						a[bodyState.orientation][quaternion.x] = v * Math.sign(a[bodyState.orientation][quaternion.x]);
						a[bodyState.angularVelocity][vector3.x] = 0;
					}
					if (Math.abs(a[bodyState.orientation][quaternion.y]) > v) {
						a[bodyState.orientation][quaternion.y] = v * Math.sign(a[bodyState.orientation][quaternion.y]);
						a[bodyState.angularVelocity][vector3.y] = 0;
					}
				};
				noKnockback = c => {
					if (this.noKnockbackDirty) {
						return;
					}
					if (!c?.__proto__) {
						return;
					}
					let a = c.__proto__;
					if (!noKnockback.path) {
						noKnockback.path = getByIndex(a, 9)?.[0];
					}
					if (a[noKnockback.path]) {
						if (!!this.noKnockbackDirty || !a.copy) {
							a.copy = a[noKnockback.path];
							a[noKnockback.path] = function () {
								if (unsafeWindow.config.data.physics.noKnockback.bind.state) {
									let b = Object.keys(arguments[1]);
									arguments[1] = {
										[b[0]]: 0,
										[b[1]]: 0,
										[b[2]]: arguments[1][b[2]] > 0 ? 0 : arguments[1][b[2]]
									};
								}
								a.copy.apply(this, arguments);
							};
							this.noKnockbackDirty = true;
						}
					}
				};
				ignoreTanks = b => {
					if (this.#t.ignoreTanks.bind.state || this.ignoreTanksDirty) {
						ignoreTanks.path ||= Object.keys(b)?.[6];
						ignoreTanks.value ||= Object.keys(b?.[ignoreTanks.path])?.[4];
						if (b?.[ignoreTanks.path]?.[ignoreTanks.value]) {
							b[ignoreTanks.path][ignoreTanks.value] = true;
							if (!this.#t.ignoreTanks.bind.state && this.ignoreTanksDirty) {
								b[ignoreTanks.path][ignoreTanks.value] = b[ignoreTanks.path][ignoreTanks.value] | 11;
								this.ignoreTanksDirty = false;
							}
							if (this.#t.ignoreTanks.bind.state) {
								b[ignoreTanks.path][ignoreTanks.value] = b[ignoreTanks.path][ignoreTanks.value] & -12;
								this.ignoreTanksDirty = true;
							}
						}
					}
				};
				recoil = b => {
					if (!b && (this.#t.recoil.bind.state || this.values.recoil !== undefined)) {
						if (!recoil.path) {
							recoil.path = getByIndex(localTank.recoil, 3)?.[0];
						}
						if (typeof localTank.recoil?.[recoil.path] != "number") {
							return this.values.recoil = undefined;
						}
						if (this.#t.recoil.bind.state) {
							if (this.values.recoil) {
								localTank.recoil[recoil.path] = this.#t.recoil.value * this.values.recoil;
							} else {
								this.values.recoil = localTank.recoil[recoil.path];
							}
						} else if (this.values.recoil) {
							localTank.recoil[recoil.path] = this.values.recoil;
							this.values.recoil = undefined;
						}
					}
				};
				gravity = (c, b) => {
					if (!b && (this.#t.gravity.bind.state || this.values.gravity !== undefined)) {
						if (!gravity.path) {
							gravity.path = getByIndex(c, 1)?.[0];
						}
						gravity.path1 ||= getByIndex(c?.[gravity.path], 0)?.[0];
						if (typeof c?.[gravity.path]?.[gravity.path1] != "number") {
							return this.values.gravity = undefined;
						}
						if (this.#t.gravity.bind.state) {
							if (this.values.gravity) {
								let new_value = 0
								if (this.#t.gravity.value > 0) {
									new_value = -this.#t.gravity.value / 100
								} else if (this.#t.gravity.value < 0) {
									new_value = Math.abs(this.#t.gravity.value)
								}
								c[gravity.path][gravity.path1] = new_value
							} else {
								this.values.gravity = c[gravity.path][gravity.path1];
							}
						} else if (typeof this.values.gravity == "number") {
							c[gravity.path][gravity.path1] = this.values.gravity;
							this.values.gravity = undefined;
						}
					}
				};
				mass = (b, c) => {
					if (!c && (this.#t.mass.bind.state || this.values.mass !== undefined)) {
						if (!mass.path) {
							mass.path = getByIndex(b, 0)?.[0];
						}
						if (typeof b?.[mass.path] != "number") {
							return this.values.mass = undefined;
						}
						if (this.#t.mass.bind.state) {
							if (this.values.mass) {
								b[mass.path] = this.#t.mass.value * this.values.mass;
							} else {
								this.values.mass = b[mass.path];
							}
						} else if (typeof this.values.mass == "number") {
							b[mass.path] = this.values.mass;
							this.values.mass = undefined;
						}
					}
				};
				calculateDistance(c, d) {
					let e = d[vector3.x] - c.x;
					let f = d[vector3.y] - c.y;
					let a = d[vector3.z] - c.z;
					return Math.sqrt(e * e + f * f + a * a);
				}
				process = d => {
					let e = unsafeWindow.config.data.shortcuts.state;
					if (e && unsafeWindow.utils.isBindPressed(this.#t.noTilt)) {
						this.#t.noTilt.bind.state = !this.#t.noTilt.bind.state;
						unsafeWindow.message.send("No tilt", this.#t.noTilt.bind.state);
					}
					if (e && unsafeWindow.utils.isBindPressed(this.#t.noFlip)) {
						this.#t.noFlip.bind.state = !this.#t.noFlip.bind.state;
						unsafeWindow.message.send("No flip", this.#t.noFlip.bind.state);
					}
					if (e && unsafeWindow.utils.isBindPressed(this.#t.ignoreTanks)) {
						this.#t.ignoreTanks.bind.state = !this.#t.ignoreTanks.bind.state;
						unsafeWindow.message.send("Ignore tanks", this.#t.ignoreTanks.bind.state);
					}
					if (e && unsafeWindow.utils.isBindPressed(this.#t.noKnockback)) {
						this.#t.noKnockback.bind.state = !this.#t.noKnockback.bind.state;
						unsafeWindow.message.send("No knockback", this.#t.noKnockback.bind.state);
					}
					if (e && unsafeWindow.utils.isBindPressed(this.#t.gravity)) {
						this.#t.gravity.bind.state = !this.#t.gravity.bind.state;
						unsafeWindow.message.send("Gravity", this.#t.gravity.bind.state);
					}
					if (e && unsafeWindow.utils.isBindPressed(this.#t.mass)) {
						this.#t.mass.bind.state = !this.#t.mass.bind.state;
						unsafeWindow.message.send("Mass", this.#t.mass.bind.state);
					}
					if (e && unsafeWindow.utils.isBindPressed(this.#t.recoil)) {
						this.#t.recoil.bind.state = !this.#t.recoil.bind.state;
						unsafeWindow.message.send("Recoil", this.#t.recoil.bind.state);
					}
					if (e && unsafeWindow.utils.isBindPressed(this.#t.oldPhysics)) {
						this.#t.oldPhysics.bind.state = !this.#t.oldPhysics.bind.state;
						unsafeWindow.message.send("Old physics", this.#t.oldPhysics.bind.state);
					}
					let b = unsafeWindow.config.data.stickData.nextTargetData.bind.state || airBreak.state;
					this.recoil(b);
					if (!d || !d?.[tankPhysicsComponent.body]) {
						return;
					}
					let a = d[tankPhysicsComponent.body];
					this.ignoreTanks(d);
					this.noKnockback(a);
					this.noTilt(a, b);
					this.noFlip(a, b);
					this.gravity(a, b);
					this.mass(a, b);
					this.oldPhysics();
				};
			}
		},
		987: (a, c, d) => {
			d.d(c, {
				A: () => e
			});
			class e {
				#t = unsafeWindow.config.data.removeMinesData;
				removeMines;
				reset = () => {
					this.removeMines = undefined;
				};
				process = () => {
					if (unsafeWindow.config.data.shortcuts.state && unsafeWindow.utils.isBindPressed(this.#t)) {
						this.#t.bind.state = !this.#t.bind.state;
						unsafeWindow.message.send("Remove mines", this.#t.bind.state);
					}
					if (!this.#t.bind.state) {
						return;
					}
					if (this.#t.type === 'all') {
						this.removeAll()
					} else {
						const myTeam = localTank.tankComponent?.[playerStatus.teamObj]?.[playerStatus.team]
						const mines = gameMode.minesOnFieldComponent?.[rmmine.path1]?.[rmmine.path2]?.[rmmine.mines]
						if (!mines || !myTeam || mines.length === 0) {
							return
						}
						this.removeBy(mines, myTeam, this.#t.type === 'enemies' ? true : false)
					}
				};
				removeBy(mines, myTeam, removeEnemiesMines = true) {
					if (!rmmine.team4) {
						const firstMines = gameMode.minesOnFieldComponent?.[rmmine.path1]?.[rmmine.path2]?.[rmmine.mines].find(el => el !== null);
						if (!firstMines) {
							return
						}
						getName(rmmine, "team1", "team1", firstMines, 5);
						getName(rmmine, "team2", "team2", firstMines?.[rmmine.team1], 0);
						getName(rmmine, "team3", "team3", firstMines?.[rmmine.team1]?.[rmmine.team2]?.[2], -1);
						getName(rmmine, "team4", "team4", firstMines?.[rmmine.team1]?.[rmmine.team2]?.[2]?.[rmmine.team3], 0);
						if (!firstMines?.[rmmine.team1]?.[rmmine.team2]?.[2]?.[rmmine.team3]?.[rmmine.team4]) {
							return
						}
					}
					for (const mine of mines) {
						let mineTeam = mine?.[rmmine.team1]?.[rmmine.team2]?.[2]?.[rmmine.team3]?.[rmmine.team4]
						if (removeEnemiesMines && mineTeam !== myTeam) {
							this.deactivateMine(mine)
						} else if (!removeEnemiesMines && mineTeam === myTeam) {
							this.deactivateMine(mine)
						}
					}
				}
				deactivateMine(mine) {
					if (!mine) {
						return
					}
					let a = mine?.[battleEntity.callBacks]?.[battleEntity.map];
					if (!a || typeof a != "object") {
						return;
					}
					let b = 0;
					for (const c of a) {
						let k = c?.[1]
						if (!signal.functions) {
							signal.functions = getByIndex(k, 0)?.[0];
							signal.functions;
						}
						if (k?.[signal.functions]?.[nativeList.array]) {
							for (const a of k[signal.functions][nativeList.array]) {
								if (!signalBind.callBack) {
									signalBind.callBack = getByIndex(a, 1)?.[0];
									signalBind.callBack;
								}
								if (a[signalBind.callBack]?.callableName === "deactivateMine") {
									Array.from(mine[battleEntity.callBacks][battleEntity.map])[b][1][signal.functions][nativeList.array][0][signalBind.callBack]?.()
									return;
								}
							}
						}
						b++;
					}
				}
				removeAll() {
					if (this.removeMines) {
						this.removeMines();
					} else {
						if (!gameMode.components?.[0]?.[1] || typeof gameMode.components[0][1] != "object") {
							return;
						}
						let d = Object.entries(gameMode.components?.[0]?.[1])?.[1]?.[1];
						if (!d || typeof d != "object") {
							return;
						}
						let a = d?.[battleEntity.callBacks]?.[battleEntity.map]
						if (!a || typeof a != "object") {
							return;
						}
						let b = 0;
						for (const c of a) {
							let k = c?.[1]
							if (!k || typeof k != "object") {
								continue
							}
							if (!signal.functions) {
								signal.functions = getByIndex(k, 0)?.[0];
								signal.functions;
							}
							if (k?.[signal.functions]?.[nativeList.array]) {
								for (const a of k[signal.functions][nativeList.array]) {
									if (!signalBind.callBack) {
										signalBind.callBack = getByIndex(a, 1)?.[0];
										signalBind.callBack;
									}
									if (a[signalBind.callBack]?.callableName === "removeMines") {
										this.removeMines = Array.from(d[battleEntity.callBacks][battleEntity.map].values())[b + 5][signal.functions][nativeList.array][0][signalBind.callBack]
										return;
									}
								}
							}
							b++;
						}
					}
				}
			}
		},
		685: (d, a, b) => { },
		539: (a, b, e) => {
			e.d(b, {
				A: () => d
			});
			var j = e(874);
			class d {
				#c;
				index = 0;
				#t = unsafeWindow.config.data.stickData;
				reset = () => {
					this.#c = undefined;
					this.#t.distance.value = 500;
				};
				stick = a => {
					this.index++;
					this.#c = a;
				};
				clean = () => {
					this.#c = undefined;
					this.index = 0;
				};
				keyHandler = () => {
					if (unsafeWindow.utils.getKeyState(this.#t.distance.closer.key)) {
						this.#t.distance.value -= 10;
					}
					if (unsafeWindow.utils.getKeyState(this.#t.distance.further.key)) {
						this.#t.distance.value += 10;
					}
					if (this.#t.distance.value > 3000) {
						this.#t.distance.value = 3000;
					}
					if (this.#t.distance.value < -3000) {
						this.#t.distance.value = -3000;
					}
				};
				nextTarget = () => {
					let a = utils.getTanks(this.#t.onlyEnemies);
					if (!unsafeWindow.utils.isArrayValid(a)) {
						return;
					}
					if (this.index >= a.length) {
						this.index = 0;
					}
					this.#c = a[this.index];
					this.index++;
					let b = unsafeWindow.utils.getUsername(this.#c);
					if (typeof b == "string") {
						unsafeWindow.message.send("Stick target changed to:", b);
						unsafeWindow.menu.selected.stick = b;
					}
				};
				process = g => {
					if (!this.#t.state) {
						return this.reset();
					}
					let d = unsafeWindow.config.data.shortcuts.state;
					if (this.#c && this.#t.randomizer.bind.state) {
						this.nextTarget();
					}
					if (d && unsafeWindow.utils.isBindPressed(this.#t.randomizer)) {
						this.#t.randomizer.bind.state = !this.#t.randomizer.bind.state;
						unsafeWindow.message.send("Stick randomizer", this.#t.randomizer.bind.state);
					}
					if (d && unsafeWindow.utils.isBindPressed(this.#t.nextTargetData)) {
						this.nextTarget();
					}
					if (d && this.#c && unsafeWindow.utils.isBindPressed(this.#t.deactivateData)) {
						unsafeWindow.message.send("Stick hack", false);
						this.#c = undefined;
					}
					if (!this.#c || !g) {
						return;
					}
					/* if (!unsafeWindow.airBreak.state) {
						g[tankPhysicsComponent.body][body.movable] = true;
					} */
					let e = g[tankPhysicsComponent.body][body.state];
					let a = localTank.tankphysics(this.#c)?.[tankPhysicsComponent.body]?.[body.state];
					if (!e || !a) {
						return;
					}
					let b = {
						[vector3.x]: 0,
						[vector3.y]: 0,
						[vector3.z]: 0
					};
					a[bodyState.orientation][quaternion.getYAxis](b);
					let c = Math.atan2(b[vector3.y], b[vector3.x]);
					const f = {
						x: a[bodyState.position][vector3.x] - this.#t.distance.value * Math.sin(-(c - Math.PI / 2)),
						y: a[bodyState.position][vector3.y] - this.#t.distance.value * Math.cos(-(c - Math.PI / 2)),
						z: a[bodyState.position][vector3.z] + this.#t.distance.value
					};
					let h = unsafeWindow.utils.isNotKillZone(f);
					if (h !== j.F.None) {
						unsafeWindow.utils.outKillZone(f, h);
					}
					e[bodyState.position][vector3.x] = f.x;
					e[bodyState.position][vector3.y] = f.y;
					e[bodyState.position][vector3.z] = f.z;
					e[bodyState.orientation][quaternion.x] = a[bodyState.orientation][quaternion.x];
					e[bodyState.orientation][quaternion.y] = a[bodyState.orientation][quaternion.y];
					e[bodyState.orientation][quaternion.z] = a[bodyState.orientation][quaternion.z];
					e[bodyState.orientation][quaternion.w] = a[bodyState.orientation][quaternion.w];
					e[bodyState.angularVelocity][vector3.x] = 0;
					e[bodyState.angularVelocity][vector3.y] = 0;
					e[bodyState.angularVelocity][vector3.z] = 0;
					e[bodyState.velocity][vector3.x] = 0;
					e[bodyState.velocity][vector3.y] = 0;
					e[bodyState.velocity][vector3.z] = 0;
					this.keyHandler();
				};
			}
		},
		27: (a, c, e) => {
			e.d(c, {
				A: () => d
			});
			class d {
				#i = false;
				#t = unsafeWindow.config.data.weaponData.strikerData;
				index;
				rocketTP = {
					targetUsername: undefined,
					target: undefined,
					state: false,
					timeout: undefined,
					teleportToTarget: false
				};
				reset = () => {
					this.#i = false;
					this.rocketTP = {
						targetUsername: undefined,
						target: undefined,
						state: false,
						timeout: undefined,
						teleportToTarget: false
					};
				};
				target = b => {
					this.index++;
					this.rocketTP.target = b;
				};
				clean = () => {
					this.index = 0;
					this.rocketTP.target = undefined;
				};
				nextTarget = () => {
					let a = utils.getTanks(this.#t.shellsTeleportData.onlyEnemies);
					if (!unsafeWindow.utils.isArrayValid(a)) {
						return;
					}
					if (this.index >= a.length) {
						this.index = 0;
					}
					this.rocketTP.target = a[this.index];
					this.index++;
					let b = unsafeWindow.utils.getUsername(this.rocketTP.target);
					if (typeof b == "string") {
						unsafeWindow.message.send("Striker target changed to:", b);
						unsafeWindow.menu.selected.striker = b;
					}
				};
				shellsTeleport = a => {
					if (!this.#t.shellsTeleportData.state || !this.rocketTP.target) {
						return;
					}
					if (!a?.[strikerRocketFactory.shellCache]?.[cacheImpl.itemInUse]) {
						return;
					}
					const b = a[strikerRocketFactory.shellCache][cacheImpl.itemInUse].toArray();
					if (!unsafeWindow.utils.isArrayValid(b)) {
						return;
					}
					for (const c of b) {
						const a = c[battleEntity.components][nativeList.array][shellComponents.strikerRocket];
						if (a) {
							if (!strikerRocket.direction) {
								strikerRocket.direction = getByIndex(a, 10)?.[0];
								strikerRocket.direction;
							}
							if (!strikerRocket.position) {
								strikerRocket.position = getByIndex(a, 9)?.[0];
								strikerRocket.position;
							}
							a[strikerRocket.direction][vector3.x] = 0;
							a[strikerRocket.direction][vector3.y] = 0;
							a[strikerRocket.direction][vector3.z] = 0;
						}
					}
					if (b.length && this.rocketTP.state !== false && !this.rocketTP.timeout) {
						this.rocketTP.state = false;
					}
					if (this.rocketTP.state === false && !this.rocketTP.timeout && b.length >= 4) {
						this.rocketTP.timeout = setTimeout(() => {
							this.rocketTP.state = true;
							this.rocketTP.timeout = undefined; // Reset the timeout reference
							if (this.rocketTP.target) {
								let d_1 = localTank.tankphysics(this.rocketTP.target)?.[tankPhysicsComponent.body][body.state];
								for (const c of b) {
									const a = c[battleEntity.components][nativeList.array][shellComponents.strikerRocket];
									if (a) {
										a[strikerRocket.position][vector3.x] = d_1[bodyState.position][vector3.x];
										a[strikerRocket.position][vector3.y] = d_1[bodyState.position][vector3.y];
										a[strikerRocket.position][vector3.z] = d_1[bodyState.position][vector3.z];
									}
								}
							}
						}, 2000);
					}
				};
				process = () => {
					//let a = localTank?.strikerRocketFactory;
					let a = localTank?.shellFactory;
					if (a) {
						if (unsafeWindow.config.data.shortcuts.state && unsafeWindow.utils.isBindPressed(this.#t.shellsTeleportData)) {
							this.nextTarget();
						}
						this.shellsTeleport(a);
					}
				};
			}
		},
		100: (a, c, d) => {
			d.d(c, {
				A: () => e
			});
			class e {
				#t = unsafeWindow.config.data.syncData;
				fakeLagData = {
					temp: false,
					position: {
						x: 0,
						y: 0,
						z: 0
					}
				};
				deSyncData = {
					temp: false,
					orientation: {
						w: 0,
						x: 0,
						y: 0,
						z: 0
					},
					position: {
						x: 0,
						y: 0,
						z: 0
					}
				};
				calculateDistance(d, e) {
					let a = e[bodyState.position][vector3.x] - d.x;
					let f = e[bodyState.position][vector3.y] - d.y;
					let b = e[bodyState.position][vector3.z] - d.z;
					return Math.sqrt(a * a + f * f + b * b);
				}
				getDeSyncState(c, b) {
					this.deSyncData.position.x = c[bodyState.position][vector3.x];
					this.deSyncData.position.y = c[bodyState.position][vector3.y];
					this.deSyncData.position.z = c[bodyState.position][vector3.z];
					this.deSyncData.orientation.w = c[bodyState.orientation][quaternion.w];
					this.deSyncData.orientation.x = c[bodyState.orientation][quaternion.x];
					this.deSyncData.orientation.y = c[bodyState.orientation][quaternion.y];
					this.deSyncData.orientation.z = c[bodyState.orientation][quaternion.z];
				}
				deSync(a) {
					let b = a[a.body][body.state];
					if (this.deSyncData.temp && !this.#t.deSyncData.state) {
						this.deSyncData.temp = false;
						this.getDeSyncState(b);
						return true;
					} else if (!this.deSyncData.temp && this.#t.deSyncData.state) {
						this.deSyncData.temp = true;
						this.getDeSyncState(b);
						return true;
					} else {
						return !!this.#t.deSyncData.state && (this.#t.deSyncData.teleportToRealPosition && !unsafeWindow.config.data.airBreakData.toggleStateData.bind.state && (b[bodyState.position][vector3.x] = this.deSyncData.position.x, b[bodyState.position][vector3.x] = this.deSyncData.position.y, b[bodyState.position][vector3.x] = this.deSyncData.position.z, b[bodyState.orientation][quaternion.w] = this.deSyncData.orientation.w, b[bodyState.orientation][quaternion.x] = this.deSyncData.orientation.x, b[bodyState.orientation][quaternion.y] = this.deSyncData.orientation.y, b[bodyState.orientation][quaternion.z] = this.deSyncData.orientation.z, b[bodyState.angularVelocity][vector3.x] = 0, b[bodyState.angularVelocity][vector3.y] = 0, b[bodyState.angularVelocity][vector3.y] = 0, b[bodyState.velocity][vector3.x] = 0, b[bodyState.velocity][vector3.y] = 0, b[bodyState.velocity][vector3.z] = 0), true);
					}
				}
				fakeLag(a) {
					let c = a[tankPhysicsComponent.body][body.state];
					if (this.fakeLagData.temp && !this.#t.fakeLagData.bind.state) {
						this.fakeLagData.temp = false;
						this.fakeLagData.position.x = 0;
						this.fakeLagData.position.y = 0;
						this.fakeLagData.position.z = 0;
						return true;
					} else if (!this.fakeLagData.temp && this.#t.fakeLagData.bind.state) {
						this.fakeLagData.temp = true;
						this.fakeLagData.position.x = c[bodyState.position][vector3.x];
						this.fakeLagData.position.y = c[bodyState.position][vector3.y];
						this.fakeLagData.position.z = c[bodyState.position][vector3.z];
						return true;
					} else {
						return !!this.#t.fakeLagData.bind.state && this.calculateDistance(this.fakeLagData.position, c) >= this.#t.fakeLagData.distance && (c[bodyState.position][vector3.x] = this.fakeLagData.position.x, c[bodyState.position][vector3.y] = this.fakeLagData.position.y, c[bodyState.position][vector3.z] = this.fakeLagData.position.z, true);
					}
				}
				fakeLag2(a) {
					let b = a[tankPhysicsComponent.body][body.state];
					if (this.fakeLagData.temp && !this.#t.fakeLagData.state) {
						this.fakeLagData.temp = false;
						this.fakeLagData.position.x = b[bodyState.position][vector3.x];
						this.fakeLagData.position.y = b[bodyState.position][vector3.y];
						this.fakeLagData.position.z = b[bodyState.position][vector3.z];
						return true;
					} else if (!this.fakeLagData.temp && this.#t.fakeLagData.state) {
						this.fakeLagData.temp = true;
						this.fakeLagData.position.x = b[bodyState.position][vector3.x];
						this.fakeLagData.position.y = b[bodyState.position][vector3.y];
						this.fakeLagData.position.z = b[bodyState.position][vector3.z];
						return true;
					} else {
						return !!this.#t.fakeLagData.state && this.calculateDistance(this.fakeLagData.position, a) >= this.#t.fakeLagData.state.distance && (this.fakeLagData.position.x = b[bodyState.position][vector3.z], this.fakeLagData.position.y = b[bodyState.position][vector3.z], this.fakeLagData.position.z = b[bodyState.position][vector3.z], true);
					}
				}
				spinner(a) {
					if (!this.#t.spinner) {
						return;
					}
					let c = a[tankPhysicsComponent.body][body.state];
					c[bodyState.orientation][quaternion.w] = unsafeWindow.utils.getRandomArbitrary(-1, 1);
					c[bodyState.orientation][quaternion.x] = unsafeWindow.utils.getRandomArbitrary(-1, 1);
					c[bodyState.orientation][quaternion.y] = unsafeWindow.utils.getRandomArbitrary(-1, 1);
					c[bodyState.orientation][quaternion.z] = unsafeWindow.utils.getRandomArbitrary(-1, 1);
				}
				reset = () => {
					this.fakeLagData = {
						temp: false,
						position: {
							x: 0,
							y: 0,
							z: 0
						}
					};
					this.deSyncData = {
						temp: false,
						orientation: {
							w: 0,
							x: 0,
							y: 0,
							z: 0
						},
						position: {
							x: 0,
							y: 0,
							z: 0
						}
					};
				};
				process = b => {
					if (unsafeWindow.config.data.shortcuts.state && unsafeWindow.utils.isBindPressed(unsafeWindow.config.data.otherData.freezeTanks)) {
						unsafeWindow.config.data.airBreakData.toggleStateData.bind.state = !unsafeWindow.config.data.airBreakData.toggleStateData.bind.state;
						unsafeWindow.message.send("Sync", unsafeWindow.config.data.airBreakData.toggleStateData.bind.state);
					}
					this.deSync(b);
				};
			}
		},
		146: (a, c, d) => {
			d.d(c, {
				A: () => e
			});
			class e {
				#t = unsafeWindow.config.data.wallHackData.tankGlowData;
				alreadyNoColor = false;
				hexToDecimal = b => parseInt(b.replace(/^#/, ""), 16);
				drawTankGlow = (i, e = null) => {
					if (!e && this.alreadyNoColor) {
						return;
					}
					let g = localTank.hullSkinComponent(i);
					let d = localTank.weaponSkinComponent(i);
					if (!g || !d) {
						return;
					}
					getName(skin, "hullSkinComponent", "hullSkinComponent", g, 7);
					getName(skin, "weaponChildren1", "weaponChildren1", g?.[skin.hullSkinComponent], 21);
					getName(skin, "weaponChildren1Array", "weaponChildren1Array", g?.[skin.hullSkinComponent]?.[skin.weaponChildren1], 0);
					getName(skin, "weaponSkinComponent", "weaponSkinComponent", d, 12);
					getName(skin, "outline", "outline", g?.[skin.hullSkinComponent], -3);
					getName(skin, "color", "color", g?.[skin.hullSkinComponent], -2);
					getName(skin, "bold", "bold", g?.[skin.hullSkinComponent], -1);
					let c = g?.[skin.hullSkinComponent];
					let b = d?.[skin.weaponSkinComponent];
					let j = b?.[skin.weaponChildren1]?.[skin.weaponChildren1Array];
					let f = c?.[skin.weaponChildren1]?.[skin.weaponChildren1Array];
					if (c && b && c?.[skin.color]) {
						if (e) {
							c[skin.outline] = true;
							c[skin.bold] = e.bold;
							c[skin.color] = e.dec;
							if (typeof f == "object") {
								for (const b of f) {
									b[skin.outline] = true;
									b[skin.bold] = e.bold;
									b[skin.color] = e.dec;
								}
							}
							b[skin.outline] = true;
							b[skin.bold] = e.bold;
							b[skin.color] = e.dec;
							if (typeof j == "object") {
								for (const b of j) {
									b[skin.outline] = true;
									b[skin.bold] = e.bold;
									b[skin.color] = e.dec;
								}
							}
							this.alreadyNoColor = false;
						} else {
							b[skin.outline] = false;
							c[skin.outline] = false;
							if (typeof j == "object") {
								for (const b of j) {
									b[skin.outline] = false;
								}
							}
							if (typeof f == "object") {
								for (const b of f) {
									b[skin.outline] = false;
								}
							}
							this.alreadyNoColor = true;
						}
					}
				};
				tankGlowHandler = b => {
					if (this.#t.colorTarget.state && bulletTP.target === b) {
						return this.drawTankGlow(b, this.#t.colorTarget);
					}
					if (unsafeWindow.utils.isTankEnemy(b)) {
						if (this.#t.colorEnemy.state) {
							return this.drawTankGlow(b, this.#t.colorEnemy);
						}
					} else if (this.#t.colorTeam.state) {
						return this.drawTankGlow(b, this.#t.colorTeam);
					}
					return this.drawTankGlow(b);
				};
				process = () => {
					let c = unsafeWindow.utils.getTanks();
					if (unsafeWindow.utils.isArrayValid(c)) {
						for (const a of c) {
							this.tankGlowHandler(a);
						}
					}
				};
			}
		},
		157: (a, b, d) => {
			d.d(b, {
				A: () => e
			});
			class e {
				#t = unsafeWindow.config.data.filtersData;
				process = () => {
					const a = document.querySelector("#root > div > canvas");
					if (!a) {
						return;
					}
					let b = "";
					if (this.#t.blur !== 0) {
						b += "blur(" + this.#t.blur + "px) ";
					}
					if (this.#t.brightness !== 0) {
						b += "brightness(" + this.#t.brightness + ") ";
					}
					if (this.#t.contrast !== 0) {
						b += "contrast(" + this.#t.contrast + "%) ";
					}
					if (this.#t.grayscale !== 0) {
						b += "grayscale(" + this.#t.grayscale + "%) ";
					}
					if (this.#t["hue-rotate"] !== 0) {
						b += "hue-rotate(" + this.#t["hue-rotate"] + "deg) ";
					}
					if (this.#t.invert !== 0) {
						b += "invert(" + this.#t.invert + "%) ";
					}
					if (this.#t.saturate !== 0) {
						b += "saturate(" + this.#t.saturate + ") ";
					}
					if (this.#t.sepia !== 0) {
						b += "sepia(" + this.#t.sepia + "%) ";
					}
					a.style.filter = b;
				};
				reset() {
					this.#t.blur = 0;
					this.#t.brightness = 0;
					this.#t.contrast = 0;
					this.#t.grayscale = 0;
					this.#t["hue-rotate"] = 0;
					this.#t.invert = 0;
					this.#t.saturate = 0;
					this.#t.sepia = 0;
				}
			}
		},
		471: (c, e, f) => {
			f.d(e, {
				A: () => b
			});
			var d = f(98);
			var g = f(173);
			class b {
				packetCounter = 0;
				lastResponseTime = new Date().getTime();
				get responseTime() {
					return new Date().getTime() - this.lastResponseTime;
				}
			}
			setInterval(() => {
				const c = document.getElementsByClassName("BattleHudFpsComponentStyle-container")[0];
				if (c && c.childElementCount >= 2) {
					if (unsafeWindow.config.data.ui.showPPS) {
						if (!document.getElementById("malcomX_pps_container")) {
							const a = document.createElement("div");
							a.id = "malcomX_pps_container";
							a.innerHTML = "<div class=\"sc-bwzfXH cmInNa BattleHudFpsComponentStyle-row\" data-style=\"BattleHudFpsComponentStyle-row\"><span class=\"sc-bxivhb fPSAir\" data-style=\"BattleHudFpsComponentStyle-label\">Bullets: </span><span class=\"sc-bxivhb bcGHtx\" data-style=\"BattleHudFpsComponentStyle-value\" id=\"pps\" style=\"color:rgb(116, 186, 61); margin-left: 0.3em;\">0</span></div>";
							c.appendChild(a);
						}
						const b = document.getElementById("pps");
						b.textContent = unsafeWindow.bulletTP.currBulletNumInAir.toString();
					} else if (document.getElementById("malcomX_pps_container")) {
						document.getElementById("malcomX_pps_container").remove();
					}
					if (unsafeWindow.config.data.ui.showMinesCounter) {
						if (!document.getElementById("malcomX_mines_container")) {
							const b = document.createElement("div");
							b.id = "malcomX_mines_container";
							b.innerHTML = "<div class=\"sc-bwzfXH cmInNa BattleHudFpsComponentStyle-row\" data-style=\"BattleHudFpsComponentStyle-row\"><span class=\"sc-bxivhb fPSAir\" data-style=\"BattleHudFpsComponentStyle-label\">Mines: </span><span class=\"sc-bxivhb bcGHtx\" data-style=\"BattleHudFpsComponentStyle-value\" id=\"minesCounter\" style=\"color:rgb(116, 186, 61); margin-left: 0.3em;\">0</span></div>";
							c.appendChild(b);
						}
						document.getElementById("minesCounter").textContent = unsafeWindow.utils.minesCounter();
					} else if (document.getElementById("malcomX_mines_container")) {
						document.getElementById("malcomX_mines_container").remove();
					}
					g.I6.packetCounter = 0;
				}
			}, 1000);
			d.A.before = function () {
				g.I6.packetCounter++;
			};
			d.A.after = function (c, a, b) {
				if (g.I6.responseTime >= 5) {
					g.I6.lastResponseTime = new Date().getTime();
				}
				return c;
			};
		},
		825: (d, a, c) => {
			function e() {
				getName(battleMapComponent, "gravity", "battleMapComponent", gameMode.battleMapComponent, 7);
				getName(battleMapComponent, "bounds", "battleMapComponent", gameMode.battleMapComponent, 8);
				getName(battleMapComponent, "gameMode", "battleMapComponent", gameMode.battleMapComponent, -1);
				if (!battleMapComponent.gameMode || !battleChatComponent.bounds) {
					getName(battleMapComponent, "gameMode", "battleMapComponent", gameMode.battleMapComponent, 19);
					getName(battleMapComponent, "bounds", "battleMapComponent", gameMode.battleMapComponent, 6);
				}
				getName(tanksOnFieldRegistryImpl, "tanksOnField", "gameMode", gameMode.battleMapComponent?.[battleMapComponent.gameMode], 8);
				getName(tanksOnFieldRegistryImpl, "getTanks", "tanksOnFieldRegistryImpl", gameMode.battleMapComponent?.[battleMapComponent.gameMode]?.[tanksOnFieldRegistryImpl.tanksOnField]?.__proto__, 3);
				getName(tanksOnFieldRegistryImpl, "getTankById", "tanksOnFieldRegistryImpl", gameMode.battleMapComponent?.[battleMapComponent.gameMode]?.[tanksOnFieldRegistryImpl.tanksOnField]?.__proto__, 2);
				getName(tankPhysicsComponent, "body", "tankPhysicsComponent", localTank.physics, -1);
				getName(tankPhysicsComponent, "mainHull", "tankPhysicsComponent", localTank.physics, 6);
				getName(tankPhysicsComponent, "interpolatedPosition", "tankPhysicsComponent", localTank.physics, 9);
				getName(body, "hitArea", "body", localTank.physics?.[tankPhysicsComponent.mainHull], -1);
				getName(body, "state", "body", localTank.physics?.[tankPhysicsComponent.body], -2);
				getName(body, "movable", "body", localTank.physics?.[tankPhysicsComponent.body], 5);
				getName(bodyState, "velocity", "bodyState", localTank.physics?.[tankPhysicsComponent.body]?.[body.state], 0);
				getName(bodyState, "orientation", "bodyState", localTank.physics?.[tankPhysicsComponent.body]?.[body.state], 1);
				getName(bodyState, "angularVelocity", "bodyState", localTank.physics?.[tankPhysicsComponent.body]?.[body.state], 2);
				getName(bodyState, "position", "bodyState", localTank.physics?.[tankPhysicsComponent.body]?.[body.state], 3);
				getName(vector3, "x", "vector3", localTank.physics?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.position], 0);
				getName(vector3, "y", "vector3", localTank.physics?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.position], 1);
				getName(vector3, "z", "vector3", localTank.physics?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.position], 2);
				getName(quaternion, "w", "quaternion", localTank.physics?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.orientation], 0);
				getName(quaternion, "x", "quaternion", localTank.physics?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.orientation], 1);
				getName(quaternion, "y", "quaternion", localTank.physics?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.orientation], 2);
				getName(quaternion, "z", "quaternion", localTank.physics?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.orientation], 3);
				getName(quaternion, "fromEulerAngles", "quaternion", localTank.physics?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.orientation]?.__proto__, 15);
				getName(quaternion, "getYAxis", "quaternion", localTank.physics?.[tankPhysicsComponent.body]?.[body.state]?.[bodyState.orientation]?.__proto__, 12);
				getName(aabb, "minX", "aabb", gameMode.battleMapComponent?.[battleMapComponent.bounds], 0);
				getName(aabb, "minY", "aabb", gameMode.battleMapComponent?.[battleMapComponent.bounds], 1);
				getName(aabb, "minZ", "aabb", gameMode.battleMapComponent?.[battleMapComponent.bounds], 2);
				getName(aabb, "maxX", "aabb", gameMode.battleMapComponent?.[battleMapComponent.bounds], 3);
				getName(aabb, "maxY", "aabb", gameMode.battleMapComponent?.[battleMapComponent.bounds], 4);
				getName(aabb, "maxZ", "aabb", gameMode.battleMapComponent?.[battleMapComponent.bounds], 5);
				getName(followCamera, "pathPosition", "followCamera", localTank.followCamera, 7);
				getName(followCamera, "currState", "followCamera", localTank.followCamera, 17);
				getName(followCamera, "pivot", "followCamera", localTank.followCamera, 18);
				getName(followCamera, "elevation", "followCamera", localTank.followCamera, 19);
				getName(followCamera, "polarDistance", "followCamera", localTank.followCamera, 20);
				getName(followCamera, "pitch", "followCamera", localTank.followCamera, 21);
				getName(followCamera, "pathPointElevation", "followCamera", localTank.followCamera, 12);
				getName(followCamera, "pathPositionOffset", "followCamera", localTank.followCamera, 9);
				getName(followCamera, "updatePath", "followCamera", localTank.followCamera?.__proto__, 5);
				getName(dampedSpring, "value", "dampedSpring", localTank.followCamera?.[followCamera.pitch], 7);
				getName(dampedSpring, "update", "dampedSpring", localTank.followCamera?.[followCamera.pitch]?.__proto__, 2);
				getName(dampedSpring, "pivot", "dampedSpring", localTank.followCamera?.[followCamera.pivot]?.__proto__, 1);
				getName(followCameraState, "direction", "followCameraState", localTank.followCamera?.[followCamera.currState], 1);
				getName(rmmine, "path1", "rmmine", gameMode.minesOnFieldComponent, 4);
				getName(rmmine, "path2", "rmmine", gameMode.minesOnFieldComponent?.[rmmine.path1], 5);
				getName(rmmine, "count", "rmmine", gameMode.minesOnFieldComponent?.[rmmine.path1]?.[rmmine.path2], 8);
				getName(rmmine, "mines", "rmmine", gameMode.minesOnFieldComponent?.[rmmine.path1]?.[rmmine.path2], 1);
				getName(playerStatus, "path", "path", localTank.tankComponent, 3);
				getName(playerStatus, "status", "status", localTank.tankComponent?.[playerStatus.path], 0);
				getName(playerStatus, "teamObj", "teamObj", localTank.tankComponent, 4);
				getName(playerStatus, "team", "team", localTank.tankComponent?.[playerStatus.teamObj], 0);
				getName(tankComponent, "team", "tankComponent", localTank.tankComponent, 4);
				getName(battleTeam, "name", "battleTeam", localTank.tankComponent?.[tankComponent.team], 0);
				getName(trackedChassis, "params", "trackedChassis", localTank.trackedChassis, 12);
				getName(suspensionParams, "maxRayLength", "suspensionParams", localTank.trackedChassis?.[trackedChassis.params], 0);
				getName(strikerRocketFactory, "shellCache", "strikerRocketFactory", localTank?.shellFactory, 6);
				getName(cacheImpl, "itemInUse", "cacheImpl", localTank?.shellFactory?.[strikerRocketFactory.shellCache], 1);
			}
			c.d(a, {
				C: () => e
			});
			unsafeWindow.heal = {
				total: undefined,
				current: undefined
			};
			unsafeWindow.mass = {
				path: undefined
			};
			unsafeWindow.gravity = {
				path: undefined,
				path1: undefined
			};
			unsafeWindow.recoil = {
				path: undefined
			};
			unsafeWindow.noKnockback = {
				path: undefined
			};
			unsafeWindow.oldPhysics = {
				tiltStabilityMaxAngle: undefined,
				value: undefined
			};
			unsafeWindow.aimBot = {
				TargetingSystemWithHorizontalAimAssist: undefined,
			};
			unsafeWindow.ignoreTanks = {
				path: undefined,
				value: undefined
			};
			unsafeWindow.rmmine = {
				path1: undefined,
				path2: undefined,
				count: undefined,
				mines: undefined,
				functions: undefined,
				team1: undefined,
				team2: undefined,
				team3: undefined,
				team4: undefined
			};
			unsafeWindow.skin = {
				hullSkinComponent: undefined,
				weaponSkinComponent: undefined,
				outline: undefined,
				color: undefined,
				bold: undefined,
				weaponChildren1: undefined,
				weaponChildren1Array: undefined
			};
			unsafeWindow.speed = {
				path1: undefined,
				path2: undefined,
				path3: undefined,
				path4: undefined
			};
			unsafeWindow.flags = {
				flagPath: undefined,
				flagPath1: undefined,
				flagPath2: undefined,
				flagsData: undefined,
				team: undefined
			};
			unsafeWindow.playerStatus = {
				path: undefined,
				status: undefined,
				teamObj: undefined
			};
			unsafeWindow.vector3 = {
				x: undefined,
				y: undefined,
				z: undefined
			};
			unsafeWindow.bodyState = {
				position: undefined,
				velocity: undefined,
				angularVelocity: undefined,
				orientation: undefined
			};
			unsafeWindow.quaternion = {
				w: undefined,
				x: undefined,
				y: undefined,
				z: undefined,
				fromEulerAngles: undefined,
				getYAxis: undefined
			};
			unsafeWindow.nativeList = {
				array: undefined
			};
			unsafeWindow.strikerRocketFactory = {
				shellCache: undefined
			};
			unsafeWindow.cacheImpl = {
				itemInUse: undefined
			};
			unsafeWindow.shellComponents = {
				strikerRocket: 1
			};
			unsafeWindow.strikerRocket = {
				direction: undefined,
				position: undefined
			};
			unsafeWindow.battleEntity = {
				components: undefined,
				callBacks: undefined,
				map: undefined
			};
			unsafeWindow.tankPhysicsComponent = {
				mainHull: undefined,
				body: undefined,
				interpolatedPosition: undefined
			};
			unsafeWindow.body = {
				hitArea: undefined,
				state: undefined,
				movable: undefined
			};
			unsafeWindow.targetingSectorsCalculator = {
				maxElevationAngle: undefined,
				minElevationAngle: undefined
			};
			unsafeWindow.followCamera = {
				currState: undefined,
				pathPosition: undefined,
				polarDistance: undefined,
				pitch: undefined,
				elevation: undefined,
				pivot: undefined,
				updatePath: undefined,
				pathPointElevation: undefined,
				pathPositionOffset: undefined
			};
			unsafeWindow.dampedSpring = {
				value: undefined,
				update: undefined,
				pivot: undefined
			};
			unsafeWindow.followCameraState = {
				direction: undefined
			};
			unsafeWindow.trackedChassis = {
				params: undefined
			};
			unsafeWindow.suspensionParams = {
				maxRayLength: undefined
			};
			unsafeWindow.battleMapComponent = {
				gravity: undefined,
				bounds: undefined,
				gameMode: undefined
			};
			unsafeWindow.aabb = {
				minX: undefined,
				minY: undefined,
				minZ: undefined,
				maxX: undefined,
				maxY: undefined,
				maxZ: undefined
			};
			unsafeWindow.battleChatComponent = {
				isInputActive: undefined
			};
			unsafeWindow.tankComponent = {
				team: undefined
			};
			unsafeWindow.battleTeam = {
				name: undefined
			};
			unsafeWindow.tanksOnFieldRegistryImpl = {
				getTanks: undefined,
				getTankById: undefined,
				tanksOnField: undefined
			};
			unsafeWindow.userTitleComponent = {
				currentAlpha: undefined,
				userTitleConfiguration: undefined,
				userClanConfiguration: undefined,
				userNameBar: undefined
			};
			unsafeWindow.userNameBar = {
				renderStage: undefined
			};
			unsafeWindow.renderStage = {
				ordinal: undefined
			};
			unsafeWindow.userTitleConfiguration = {
				name: undefined,
				clan: undefined
			};
			unsafeWindow.signal = {
				functions: undefined
			};
			unsafeWindow.signalBind = {
				callBack: undefined
			};
			unsafeWindow.action = {
				name: undefined,
				wasPressed: undefined,
				wasRelesed: undefined
			};
			unsafeWindow.rootComponent = {
				state: undefined
			};
			unsafeWindow.TOState = {
				shop: undefined
			};
			unsafeWindow.shop = {
				enabled: undefined
			};
			unsafeWindow.followCameraHeightController = {
				getTickEnabled: undefined
			};
			unsafeWindow.localTankStateServerSenderComponent = {
				needImmediateUpdate: undefined
			};
			unsafeWindow.weaponTrigger = {
				pulled: undefined,
				pressed: undefined
			};
			unsafeWindow.infiniteLoad = {
				path1: undefined,
				path1: undefined,
				path1: undefined
			};
			unsafeWindow.supplies = {
				name: undefined,
				fn: undefined
			};
			unsafeWindow.main = {
				s: undefined,
				c: undefined
			};
		},
		382: (a, b, d) => {
			d.d(b, {
				A: () => e
			});
			unsafeWindow.getByIndex = (c, b) => {
				if (!c) {
					return;
				}
				const a = Object.entries(c);
				if (a) {
					if (b < 0) {
						return a[a.length + b];
					}
					return a[b];
				} else {
					return undefined;
				}
			};
			unsafeWindow.getName = function (b, c, d, e, f) {
				if (!b[c]) {
					b[c] = getByIndex(e, f)?.[0];
					b[c];
				}
			};
			class e {
				#p = undefined;
				#u = undefined;
				get root() {
					if (this.#p) {
						return this.#p;
					}
					const b = document.getElementById("root");
					if (!b) {
						return;
					}
					let c = b[Object.keys(b)?.find(b => b.includes("_reactContainer"))]?.child?.child?.stateNode;
					if (!c) {
						return;
					}
					let d = c[Object.keys(c)?.[7]];
					if (!d) {
						return;
					}
					let e = d[Object.keys(d)?.[3]];
					if (e) {
						getName(rootComponent, "state", "state", e, 4);
						getName(TOState, "shop", "shop", e?.[rootComponent.state], 39);
						getName(shop, "enabled", "enabled", e?.[rootComponent.state]?.[TOState.shop], 9);
						return this.#p = e;
					} else {
						return undefined;
					}
				}
				get threadSafeList() {
					if (this.root && typeof this.root == "object") {
						return this.root[Object.keys(this.root)?.[1]];
					} else {
						return undefined;
					}
				}
				get chassisSettingsUpdater() {
					let b = Object.entries(this.threadSafeList?.[unsafeWindow.main.s]);
					if (this.#u && b[this.#u] && typeof b[this.#u]?.[1] == "object") {
						return b[this.#u][1];
					}
					for (let c in b) {
						let d = Object.entries(b[c][1]);
						if (d.length == 3 && typeof d?.[2]?.[1] == "boolean") {
							this.#u = c;
							return b[c][1];
						}
					}
				}
				reset = () => {
					this.#p = undefined;
					this.#u = undefined;
				};
			}
		},
		986: (a, d, b) => {
			b.d(d, {
				A: () => e
			});
			class e {
				#h = undefined;
				get components() {
					if (this.#h && utils.isArrayValid(this.#h)) {
						return this.#h;
					}
					if (!world.components) {
						return;
					}
					let f = world.components?.[20]?.[1];
					unsafeWindow.main.s ||= Object.entries(f)?.[1]?.[0];
					let b = f?.[unsafeWindow.main.s];
					if (!b) {
						return;
					}
					let c = b?.[0];
					if (!c) {
						return;
					}
					let a = Object.entries(c)?.[5]?.[1];
					if (!a) {
						return;
					}
					let d = Object.entries(a)?.[0]?.[1];
					if (d) {
						return this.#h = Object.entries(d);
					} else {
						return undefined;
					}
				}
				get battleMapComponent() {
					return finder.findComponent(this.components, {
						2: "boolean",
						7: "number",
						18: "object"
					}, "cache_1", 0);
				}
				get captureFlagComponent() {
					return finder.byLen(this.components, "isFlagMarkerVisible", 1, 'cache_2')
					return finder.findComponent(this.components, {
						2: "boolean",
						8: "boolean",
						10: "object"
					}, "cache_2", 0);
				}
				get battleChatComponent() {
					return this.components?.[9]?.[1];
				}
				get minesOnFieldComponent() {
					return finder.findComponent(this.components, {
						2: "boolean",
						13: "object"
					}, "cache_4", 16);
				}
				reset = () => {
					this.#h = undefined;
				};
			}
		},
		316: (a, c, e) => {
			e.d(c, {
				A: () => d
			});
			class d {
				#h = undefined;
				get components() {
					if (this.#h && unsafeWindow.utils.isArrayValid(this.#h)) {
						return this.#h;
					}
					if (!unsafeWindow.main.s && base.root) {
						unsafeWindow.main.s = Object.entries(base.threadSafeList)?.[1]?.[0];
					}
					if (typeof base.threadSafeList?.[unsafeWindow.main.s] != "object") {
						return;
					}
					if (!base.chassisSettingsUpdater) {
						return;
					}
					let c = Object.entries(base.chassisSettingsUpdater)?.[0]?.[1];
					if (!c) {
						return;
					}
					getName(unsafeWindow.battleEntity, "components", "battleEntity", c, 5);
					getName(unsafeWindow.battleEntity, "callBacks", "battleEntity", c, 3);
					getName(unsafeWindow.battleEntity, "map", "battleEntity", c?.[battleEntity.callBacks], 0);
					let d = Object.entries(c)?.[5]?.[1];
					if (!d) {
						return;
					}
					getName(unsafeWindow.nativeList, "array", "nativeList", d, 0);
					let a = d[unsafeWindow.nativeList.array];
					if (a) {
						return this.#h = Object.entries(a);
					} else {
						return undefined;
					}
				}
				get followCamera() {
					return finder.byLen(localTank.components, 'onSpawnCameraTransformQuery', 4, 'followCamera')
				}
				get hoverChassis() {
					return finder.byLen(localTank.components, 'engineList', 2, 'hoverChassis') ||
						finder.byLen(localTank.components, 'engineList', 3, 'hoverChassis')
				}
				get hoverChassisParams() {
					if (!this.hoverChassis || typeof this.hoverChassis != 'object')
						return undefined
					return finder.byLen(Object.entries(this.hoverChassis), 'tiltStabilityMaxAngle', 0, 'hoverChassisParams')
				}
				get targetingSystem() {
					return finder.byLen(this.components, "tankInputComponent", 4, 'targetingSystem');
				}
				get weaponTrigger() {
					return finder.findComponent(this.components, {
						2: "boolean",
						3: "boolean",
						6: "boolean"
					}, "cache_7", 9);
				}
				get interpolatedPosition() {
					if (!this.physics || typeof this.physics != 'object')
						return undefined
					return finder.byLen(Object.entries(this.physics), "return Math.sqrt(", 6, 'interpolatedPosition') || finder.byLen(Object.entries(this.physics), "return Math.sqrt(", 7, 'interpolatedPosition')
				}
				get physics() {
					return finder.byLen(this.components, "setPhysicsTransform", 7, 'cache_8') ||
						finder.byLen(this.components, "setPhysicsTransform", 8, 'cache_8') ||
						finder.byLen(this.components, "setPhysicsTransform", 9, 'cache_8')
				}
				get tankComponent() {
					return finder.findComponent(this.components, {
						2: "boolean",
						6: "boolean",
						4: "object",
						7: "object"
					}, "cache_9");
				}
				get shellFactory() {
					return finder.byLen(this.components, "createShell", 2, 'cache_10');
					return finder.findComponent(this.components, {
						2: "boolean",
						8: "object",
						7: {
							1: "number"
						}
					}, "cache_10", 13);
				}
				get smokyShell() {
					return finder.findComponent(this.components, {
						2: "boolean",
						4: "function",
						5: "number"
					}, "cache_11");
				}
				get strikerRocketFactory() {
					return finder.findComponent(this.components, {
						3: "number",
						8: "object",
						7: {
							8: "number"
						}
					}, "cache_12", 14);
				}
				get speedCharacteristicsComponent() {
					return finder.byLen(this.components, "gameMode", 5, 'speedCharacteristicsComponent')
				}
				get trackedChassis() {
					return finder.findComponent(localTank.components, {
						3: "boolean",
						7: "number"
					}, "trackedChassis", 20);
					return finder.byLen(this.components, "leftTrack", 2, 'trackedChassis')
				}
				get recoil() {
					return finder.byLen(this.components, "callableName=\"onShot\",", 2, 'recoil')
				}
				get turretTypeComponent() {
					return finder.debug(localTank.components, {
						3: {
							0: "string"
						}
					}, "turretTypeComponent", 4);
				}
				get healthComponent() {
					return finder.findComponent(this.components, {
						5: "number"
					}, "healthComponent", 6);
				}
				tankphysics = b => finder.byLen(b, "setPhysicsTransform", 7, 'tankphysics', true) || finder.byLen(b, "setPhysicsTransform", 8, 'tankphysics', true) || finder.byLen(b, "setPhysicsTransform", 9, 'tankphysics', true)
				userTitle = b => finder.findComponent(b, {
					2: "boolean",
					20: "object",
					19: "boolean"
				}, "userTitle", 0, true)
				othersTankComponent(b) {
					return finder.findComponent(b, {
						2: "boolean",
						6: "boolean",
						4: "object",
						7: "object"
					}, "othersTankComponent", 0, true);
				}
				hullSkinComponent(b) {
					return finder.findComponent(b, {
						4: "object",
						6: "boolean",
						7: "object",
					}, "hullSkinComponent", 19, true);
				}
				weaponSkinComponent(a) {
					return finder.findComponent(a, {
						4: "object",
						2: "boolean",
						6: "object"
					}, "weaponSkinComponent", 23, true);
				}
				reset = () => {
					this.#h = undefined;
				};
			}
		},
		979: (a, c, d) => {
			d.d(c, {
				A: () => e
			});
			class e {
				get components() {
					if (!unsafeWindow.main.s && base.root) {
						unsafeWindow.main.s = Object.entries(base.threadSafeList)?.[1]?.[0];
					}
					if (typeof base.threadSafeList?.[unsafeWindow.main.s] != "object") {
						return;
					}
					if (!base.chassisSettingsUpdater) {
						return;
					}
					let a = Object.entries(base.chassisSettingsUpdater)?.[0]?.[1];
					if (!a) {
						return;
					}
					let b = Object.entries(a)?.[1]?.[1];
					if (b) {
						return Object.entries(b);
					} else {
						return undefined;
					}
				}
				get triggers() {
					return finder.findComponent(this.components, {
						3: "boolean"
					}, "cache_5", 4);
				}
				reset = () => { };
			}
		},
		421: (a, d, b) => {
			b.d(d, {
				A: () => e
			});
			class e {
				originalData = {};
				data = {
					physics: {
						ID: "8",
						fakeLagData: {
							distance: 300,
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						oldPhysics: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						noTilt: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						noFlip: {
							value: 0.3,
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						ignoreTanks: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						gravity: {
							value: 1,
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						noKnockback: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						recoil: {
							value: 1,
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						mass: {
							value: 1,
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						spinner: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						}
					},
					themes: {
						ID: "3",
						theme: "tanki"
					},
					ui: {
						ID: "1",
						showPPS: true,
						showMinesCounter: false
					},
					bulletTP: {
						ID: "3",
						bulletNumber: 10,
						autoShot: false,
						onlyEnemies: true,
						activate: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						changeTarget: {
							bind: {
								key: "KeyK",
								pressed: false,
								state: false
							}
						},
						hitTarget: {
							bind: {
								key: "KeyL",
								pressed: false,
								state: false
							}
						}
					},
					aimBot: {
						ID: "2",
						bind: {
							key: "",
							pressed: false,
							state: false
						},
						fov: 4
					},
					shortcuts: {
						ID: "4",
						state: true,
						notification: true
					},
					antiKick: {
						ID: "1",
						state: true
					},
					flagTeleportData: {
						ID: "4",
						bind: {
							key: "",
							pressed: false,
							state: false
						},
						cooldown: 5000
					},
					airBreakData: {
						ID: "17",
						autoMove: {
							location: {
								value: "up",
								bind: {
									key: "",
									pressed: false,
									state: false
								}
							},
							zigzag: {
								bind: {
									key: "",
									pressed: false,
									state: false
								}
							},
							delay: false,
							bind: {
								key: "KeyO",
								pressed: false,
								state: false
							}
						},
						movementData: {
							forward: {
								bind: {
									key: "KeyW",
									state: false
								}
							},
							back: {
								bind: {
									key: "KeyS",
									state: false
								}
							},
							left: {
								bind: {
									key: "KeyA",
									state: false
								}
							},
							right: {
								bind: {
									key: "KeyD",
									state: false
								}
							},
							up: {
								bind: {
									key: "KeyQ",
									state: false
								}
							},
							down: {
								bind: {
									key: "KeyE",
									state: false
								}
							}
						},
						toggleStateData: {
							bind: {
								key: "ShiftRight",
								pressed: false,
								state: false
							}
						},
						typeData: {
							state: "default",
							default: {
								bind: {
									key: "",
									pressed: false,
									state: false
								}
							},
							airWalk: {
								bind: {
									key: "",
									pressed: false,
									state: false
								}
							},
							simple: {
								bind: {
									key: "",
									pressed: false,
									state: false
								}
							}
						},
						speedData: {
							state: 100,
							inc: {
								bind: {
									key: "",
									state: false
								}
							},
							dec: {
								bind: {
									key: "",
									state: false
								}
							}
						},
						smoothData: {
							state: 1,
							inc: {
								bind: {
									key: "",
									state: false
								}
							},
							dec: {
								bind: {
									key: "",
									state: false
								}
							}
						},
						killZoneData: {
							state: true,
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						flip: false,
						tilt: false
					},
					removeMinesData: {
						ID: "8",
						type: 'all',
						bind: {
							key: "",
							pressed: false,
							state: false
						}
					},
					noKnockbackData: {
						ID: "1",
						mply: 1
					},
					noKnockbackData: {
						ID: "1",
						mply: 1
					},
					otherData: {
						ID: "18",
						showUsernames: {
							bind: {
								key: "",
								pressed: false,
								state: true
							}
						},
						boxTeleport: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						autoHealingClicker: {
							percentage: 75,
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						jump: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						speedHack: {
							value: 1.2,
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						freezeTanks: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						hitArea: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						noCollision: false,
						showAlert: true,
						autoShot: {
							bind: {
								key: "KeyV",
								pressed: false,
								state: false
							}
						},
						infiniteLoad: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						}
					},
					syncData: {
						ID: "12",
						updateInterval: 70,
						warning: false,
						antiStrikerData: {
							state: false,
							type: "Enemy",
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						randomTeleportData: {
							state: false,
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						antiMineData: {
							state: false,
							height: 65,
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						verticalAntiAim: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						spinner: false,
						deSyncData: {
							state: false,
							teleportToRealPosition: false
						}
					},
					wallHackData: {
						ID: "19",
						tankGlowData: {
							colorEnemy: {
								state: true,
								bold: false,
								dec: 10108575,
								hex: "#9A3E9F"
							},
							colorTarget: {
								state: true,
								bold: true,
								dec: 16580608,
								hex: "#fd0000"
							},
							colorTeam: {
								state: true,
								bold: false,
								dec: 10024557,
								hex: "#98F66D"
							}
						}
					},
					clickerData: {
						ID: "5",
						autoHealingData: {
							state: false,
							delay: 1,
							multiply: 10,
							code: "Digit1",
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						autoArmorData: {
							state: false,
							delay: 300,
							code: "Digit2",
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						autoDamageData: {
							state: false,
							delay: 300,
							code: "Digit3",
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						autoNitroData: {
							state: false,
							delay: 300,
							code: "Digit4",
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						autoMiningData: {
							state: false,
							delay: 1,
							multiply: 10,
							code: "Digit5",
							bind: {
								key: "Numpad5",
								pressed: false,
								state: false
							}
						}
					},
					weaponData: {
						ID: "3",
						strikerData: {
							aimBotData: {
								state: false,
								bind: {
									key: "",
									state: false
								}
							},
							shellsTeleportData: {
								onlyEnemies: true,
								state: true,
								bind: {
									key: "",
									state: false
								}
							},
							getTargetForAimWithScope: {
								state: false,
								bind: {
									key: "",
									pressed: false,
									state: false
								}
							},
							getTargetForTPWithScope: {
								state: false,
								bind: {
									key: "",
									pressed: false,
									state: false
								}
							},
							nextTargetData: {
								bind: {
									key: "",
									pressed: false,
									state: false
								}
							}
						}
					},
					cameraData: {
						ID: "6",
						state: false,
						fov: 1.4,
						bind: {
							key: "",
							pressed: false,
							state: false
						}
					},
					stickData: {
						ID: "9",
						state: true,
						distance: {
							value: 500,
							closer: {
								key: "KeyW"
							},
							further: {
								key: "KeyS"
							}
						},
						onlyEnemies: true,
						randomizer: {
							bind: {
								key: "",
								pressed: false,
								state: false
							}
						},
						nextTargetData: {
							bind: {
								key: "KeyH",
								pressed: false,
								state: false
							}
						},
						deactivateData: {
							bind: {
								key: "KeyB",
								pressed: false,
								state: false
							}
						}
					},
					spectateData: {
						ID: "2",
						onlyEnemies: false,
						bind: {
							key: "KeyY",
							pressed: false,
							state: false
						}
					},
					filtersData: {
						ID: "1",
						blur: 0,
						brightness: 0,
						contrast: 0,
						grayscale: 0,
						"hue-rotate": 0,
						invert: 0,
						saturate: 0,
						sepia: 0
					}
				};
				clearCookies = () => {
					for (let b in this.data) {
						localStorage.removeItem("mx_" + b);
					}
				};
				saveState = a => {
					localStorage.setItem("mx_" + a, JSON.stringify(this.data[a]));
				};
				saveStates = () => {
					for (let b in this.data) {
						this.saveState(b);
					}
				};
				reset = () => {
					this.clearCookies();
				};
				constructor() {
					this.originalData = {
						...this.data
					};
					for (let a in this.data) {
						let b = localStorage.getItem("mx_" + a);
						if (b && (b = JSON.parse(b), this.data[a].ID === b.ID)) {
							this.data[a] = b;
						} else {
							this.saveState(a);
						}
					}
					this.saveStates();
				}
			}
		},
		579: (otherTanks, b, d) => {
			d.d(b, {
				A: () => cacheKey
			});
			class cacheKey {
				cache = {};
				classes = {};
				findStructure(e, f) {
					if (!e || typeof e != "object") {
						return false;
					}
					e = Object.entries(e);
					for (let a in f) {
						let b = f[a];
						if (typeof b == "string" && typeof e[a]?.[1] !== b) {
							return false;
						}
						if (typeof b == "object" && !this.findStructure(e[a]?.[1], b)) {
							return false;
						}
					}
					return true;
				}
				findComponent = (h, i, e, f = 0, a = false) => {
					if (h && typeof h == "object") {
						if (a && this.classes?.[e]) {
							return this.getClass(h, this.classes[e]);
						}
						if (this.cache?.[e] && h?.[this.cache[e]]?.[1]) {
							return h[this.cache[e]][1];
						}
						if (a) {
							h = Object.entries(h);
						}
						for (let c in h) {
							let b = h?.[c]?.[1];
							if (b && typeof b == "object" && (f === 0 || Object.entries(b).length === f) && this.findStructure(b, i)) {
								if (!a) {
									this.cache[e] = c;
								}
								this.classes[e] = h[c][1]?.constructor?.name;
								return h[c][1];
							}
						}
					}
				};
				getClass = function (a, b) {
					for (let c in a) {
						if (a[c]?.constructor?.name === b && typeof a[c] == "object") {
							return a[c];
						}
					}
				};
				byLen(arr, name, index, cacheKey, otherTanks = false) {
					if (!arr || typeof arr !== "object") {
						return
					}
					if (otherTanks && this.classes?.[cacheKey]) {
						return this.getClass(arr, this.classes[cacheKey]);
					}
					if (this.cache?.[cacheKey] && arr?.[this.cache[cacheKey]]?.[1]) {
						return arr[this.cache[cacheKey]][1];
					}
					if (otherTanks) {
						arr = Object.entries(arr);
					}
					const components = Object.values(arr)
					for (const component of components) {
						const prototype = component[1]?.__proto__;
						const init = Object.values(prototype)[index];
						if (init?.toString()?.includes(name)) {
							if (!otherTanks) {
								this.cache[cacheKey] = component;
							}
							this.classes[cacheKey] = component[1]?.constructor?.name;
							return component[1];
						};
					};
				};
				debug = (i, j, c, e = 0, d = false) => {
					let f = [];
					if (!i || typeof i != "object") {
						return f;
					}
					if (d) {
						i = Object.entries(i);
					}
					for (let a in i) {
						let b = i?.[a]?.[1];
						if (b && typeof b == "object") {
							if (e === 0 || Object.entries(b).length === e) {
								if (this.findStructure(b, j)) {
									f.push({
										name: b?.constructor?.name,
										index: a,
										obj: Object.entries(b)
									});
								}
							}
						}
					}
					return f;
				};
				reset = () => {
					this.cache = {};
				};
			}
		},
		555: (a, b, d) => {
			d.d(b, {
				A: () => e
			});
			class e {
				store = true;
				containers = false;
				upgrade = false;
				simulationInterval;
				constructor() { }
				chatLog() {
					let a = gameMode.battleChatComponent;
					if (!a) {
						return false;
					}
					let f = [];
					let b = getByIndex(a, 4)?.[0];
					if (!b) {
						return false;
					}
					let c = getByIndex(a?.[b], 1)?.[0];
					let g = a?.[b]?.[c];
					if (!g || typeof g !== "object" || g.length === 0) {
						return false;
					}
					for (const [a, h] of Object.entries(g)) {
						let a = getByIndex(h, 1)?.[0];
						let b = getByIndex(h, 0)?.[0];
						let d = getByIndex(h?.[b], 1)?.[0];
						if (h?.[a] && h?.[b]?.[d]) {
							f.push(h?.[b]?.[d] + ": " + h?.[a]);
						}
					}
					return f.length !== 0 && (navigator.clipboard.writeText(f.join("\n")), true);
				}
				openContainers = c => {
					let a;
					if (c) {
						a = setInterval(() => {
							document.querySelector("#root > div > div.ksc-0.LockableContainersComponentStyle-bottomBlock > div > div > div")?.click();
							const b = document.querySelector(".DeviceButtonComponentStyle-blockAlterations");
							for (let d = 0; d < 3000; d++) {
								if (!this.containers) {
									clearInterval(a);
									break;
								}
								b?.click();
								this.triggerKeyPress("Enter");
								this.triggerKeyPress("Space");
							}
						}, -1);
						setTimeout(() => {
							this.containers = false;
							clearInterval(a);
						}, 20000);
					}
				};
				openContainers2 = c => {
					let a;
					if (document.querySelector(".Common-container")) {
						if (c) {
							a = setInterval(() => {
								if (!this.containers) {
									clearInterval(a);
								}
								this.triggerKeyPress("Enter");
								this.triggerKeyPress("Space");
							}, -1);
							setTimeout(() => {
								this.containers = false;
								clearInterval(a);
							}, 20000);
						}
					} else {
						this.containers = false;
					}
				};
				fastUpgrade = a => {
					if (a) {
						this.simulationInterval = setInterval(() => {
							this.triggerKeyPress("Enter", "upgrade");
						}, 100);
					} else {
						clearInterval(this.simulationInterval);
					}
				};
				triggerKeyPress = (c, d = "") => {
					if (!(d == "upgrade" ? this.upgrade : this.containers)) {
						return;
					}
					const a = new KeyboardEvent("keydown", {
						key: c,
						code: c,
						which: c.charCodeAt(0),
						keyCode: c.charCodeAt(0),
						bubbles: true,
						cancelable: true
					});
					document.dispatchEvent(a);
					const e = new KeyboardEvent("keyup", {
						key: c,
						code: c,
						which: c.charCodeAt(0),
						keyCode: c.charCodeAt(0),
						bubbles: true,
						cancelable: true
					});
					document.dispatchEvent(e);
				};
			}
		},
		209: (b, a, d) => {
			d.d(a, {
				kp: () => e
			});
			const e = unsafeWindow.kp = new class {
				keyPresseds = [];
				constructor() {
					document.addEventListener("keydown", b => {
						if (this.keyPresseds.includes(b.code) === false) {
							this.keyPresseds.push(b.code);
						}
					});
					document.addEventListener("keyup", a => {
						if (this.keyPresseds.includes(a.code) === true) {
							let b = this.keyPresseds.indexOf(a.code);
							if (b > -1) {
								this.keyPresseds.splice(b, 1);
							}
						}
					});
					unsafeWindow.addEventListener("visibilitychange", () => {
						this.keyPresseds = [];
					});
					unsafeWindow.addEventListener("focus", () => {
						this.keyPresseds = [];
					});
				}
				isKeyPressed = b => this.keyPresseds.includes(b);
			}();
		},
		727: (d, a, b) => { },
		281: (Zg, nc, dd) => {
			function qh(b) {
				return b == null;
			}
			function e(a) {
				return a !== null && typeof a == "object";
			}
			function Ke(a) {
				return a !== null && typeof a == "object";
			}
			function A(d, b) {
				if (d.length !== b.length) {
					return false;
				}
				for (let a = 0; a < d.length; a++) {
					if (d[a] !== b[a]) {
						return false;
					}
				}
				return true;
			}
			function bh(d, b) {
				return Array.from(new Set([...Object.keys(d), ...Object.keys(b)])).reduce((e, f) => {
					const g = d[f];
					const a = b[f];
					if (Ke(g) && Ke(a)) {
						return Object.assign(Object.assign({}, e), {
							[f]: bh(g, a)
						});
					} else {
						return Object.assign(Object.assign({}, e), {
							[f]: f in b ? a : g
						});
					}
				}, {});
			}
			function dh(b) {
				return !!e(b) && "target" in b;
			}
			dd.d(nc, {
				A: () => wh
			});
			const b = {
				alreadydisposed: () => "View has been already disposed",
				invalidparams: b => "Invalid parameters for '" + b.name + "'",
				nomatchingcontroller: b => "No matching controller for '" + b.key + "'",
				nomatchingview: b => "No matching view for '" + JSON.stringify(b.params) + "'",
				notbindable: () => "Value is not bindable",
				notcompatible: b => "Not compatible with  plugin '" + b.id + "'",
				propertynotfound: b => "Property '" + b.name + "' not found",
				shouldneverhappen: () => "This error should never happen"
			};
			class hh {
				static alreadyDisposed() {
					return new hh({
						type: "alreadydisposed"
					});
				}
				static notBindable() {
					return new hh({
						type: "notbindable"
					});
				}
				static notCompatible(c, a) {
					return new hh({
						type: "notcompatible",
						context: {
							id: c + "." + a
						}
					});
				}
				static propertyNotFound(a) {
					return new hh({
						type: "propertynotfound",
						context: {
							name: a
						}
					});
				}
				static shouldNeverHappen() {
					return new hh({
						type: "shouldneverhappen"
					});
				}
				constructor(a) {
					this.message = b[a.type](a.context) ?? "Unexpected error";
					this.name = this.constructor.name;
					this.stack = new Error(this.message).stack;
					this.type = a.type;
				}
				toString() {
					return this.message;
				}
			}
			class rh {
				constructor(c, b) {
					this.obj_ = c;
					this.key = b;
				}
				static isBindable(b) {
					return b !== null && (typeof b == "object" || typeof b == "function");
				}
				read() {
					return this.obj_[this.key];
				}
				write(a) {
					this.obj_[this.key] = a;
				}
				writeProperty(b, c) {
					const a = this.read();
					if (!rh.isBindable(a)) {
						throw hh.notBindable();
					}
					if (!(b in a)) {
						throw hh.propertyNotFound(b);
					}
					a[b] = c;
				}
			}
			class g {
				constructor() {
					this.observers_ = {};
				}
				on(b, a, c) {
					let d = this.observers_[b];
					d ||= this.observers_[b] = [];
					d.push({
						handler: a,
						key: (c == null ? undefined : c.key) ?? a
					});
					return this;
				}
				off(a, e) {
					const b = this.observers_[a];
					if (b) {
						this.observers_[a] = b.filter(a => a.key !== e);
					}
					return this;
				}
				emit(c, e) {
					const b = this.observers_[c];
					if (b) {
						b.forEach(a => {
							a.handler(e);
						});
					}
				}
			}
			class a {
				constructor(c, b) {
					this.constraint_ = b == null ? undefined : b.constraint;
					this.equals_ = (b == null ? undefined : b.equals) ?? ((b, c) => b === c);
					this.emitter = new g();
					this.rawValue_ = c;
				}
				get constraint() {
					return this.constraint_;
				}
				get rawValue() {
					return this.rawValue_;
				}
				set rawValue(a) {
					this.setRawValue(a, {
						forceEmit: false,
						last: true
					});
				}
				setRawValue(d, e) {
					const a = e ?? {
						forceEmit: false,
						last: true
					};
					const f = this.constraint_ ? this.constraint_.constrain(d) : d;
					const b = this.rawValue_;
					if (!this.equals_(b, f) || a.forceEmit) {
						this.emitter.emit("beforechange", {
							sender: this
						});
						this.rawValue_ = f;
						this.emitter.emit("change", {
							options: a,
							previousRawValue: b,
							rawValue: f,
							sender: this
						});
					}
				}
			}
			class c {
				constructor(a) {
					this.emitter = new g();
					this.value_ = a;
				}
				get rawValue() {
					return this.value_;
				}
				set rawValue(a) {
					this.setRawValue(a, {
						forceEmit: false,
						last: true
					});
				}
				setRawValue(c, d) {
					const a = d ?? {
						forceEmit: false,
						last: true
					};
					const e = this.value_;
					if (e !== c || a.forceEmit) {
						this.emitter.emit("beforechange", {
							sender: this
						});
						this.value_ = c;
						this.emitter.emit("change", {
							options: a,
							previousRawValue: e,
							rawValue: this.value_,
							sender: this
						});
					}
				}
			}
			class h {
				constructor(b) {
					this.emitter = new g();
					this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this);
					this.onValueChange_ = this.onValueChange_.bind(this);
					this.value_ = b;
					this.value_.emitter.on("beforechange", this.onValueBeforeChange_);
					this.value_.emitter.on("change", this.onValueChange_);
				}
				get rawValue() {
					return this.value_.rawValue;
				}
				onValueBeforeChange_(b) {
					this.emitter.emit("beforechange", Object.assign(Object.assign({}, b), {
						sender: this
					}));
				}
				onValueChange_(b) {
					this.emitter.emit("change", Object.assign(Object.assign({}, b), {
						sender: this
					}));
				}
			}
			function sh(b, d) {
				const f = d == null ? undefined : d.constraint;
				const e = d == null ? undefined : d.equals;
				if (f || e) {
					return new a(b, d);
				} else {
					return new c(b);
				}
			}
			class th {
				constructor(b) {
					this.emitter = new g();
					this.valMap_ = b;
					for (const a in this.valMap_) {
						this.valMap_[a].emitter.on("change", () => {
							this.emitter.emit("change", {
								key: a,
								sender: this
							});
						});
					}
				}
				static createCore(a) {
					return Object.keys(a).reduce((b, c) => Object.assign(b, {
						[c]: sh(a[c])
					}), {});
				}
				static fromObject(c) {
					const b = this.createCore(c);
					return new th(b);
				}
				get(a) {
					return this.valMap_[a].rawValue;
				}
				set(c, b) {
					this.valMap_[c].rawValue = b;
				}
				value(b) {
					return this.valMap_[b];
				}
			}
			class i {
				constructor(b) {
					this.values = th.fromObject({
						max: b.max,
						min: b.min
					});
				}
				constrain(b) {
					const c = this.values.get("max");
					const d = this.values.get("min");
					return Math.min(Math.max(b, d), c);
				}
			}
			class d {
				constructor(b) {
					this.values = th.fromObject({
						max: b.max,
						min: b.min
					});
				}
				constrain(c) {
					const d = this.values.get("max");
					const e = this.values.get("min");
					let a = c;
					if (!qh(e)) {
						a = Math.max(a, e);
					}
					if (!qh(d)) {
						a = Math.min(a, d);
					}
					return a;
				}
			}
			class j {
				constructor(c, b = 0) {
					this.step = c;
					this.origin = b;
				}
				constrain(a) {
					const b = this.origin % this.step;
					return b + Math.round((a - b) / this.step) * this.step;
				}
			}
			class f {
				constructor(a) {
					this.text = a;
				}
				evaluate() {
					return Number(this.text);
				}
				toString() {
					return this.text;
				}
			}
			const k = {
				"**": (b, c) => Math.pow(b, c),
				"*": (b, c) => b * c,
				"/": (b, c) => b / c,
				"%": (b, c) => b % c,
				"+": (b, c) => b + c,
				"-": (b, c) => b - c,
				"<<": (b, c) => b << c,
				">>": (b, c) => b >> c,
				">>>": (b, c) => b >>> c,
				"&": (b, c) => b & c,
				"^": (b, c) => b ^ c,
				"|": (b, c) => b | c
			};
			class l {
				constructor(d, a, b) {
					this.left = a;
					this.operator = d;
					this.right = b;
				}
				evaluate() {
					const b = k[this.operator];
					if (!b) {
						throw new Error("unexpected binary operator: '" + this.operator);
					}
					return b(this.left.evaluate(), this.right.evaluate());
				}
				toString() {
					return ["b(", this.left.toString(), this.operator, this.right.toString(), ")"].join(" ");
				}
			}
			const m = {
				"+": b => b,
				"-": b => -b,
				"~": b => ~b
			};
			class n {
				constructor(b, c) {
					this.operator = b;
					this.expression = c;
				}
				evaluate() {
					const b = m[this.operator];
					if (!b) {
						throw new Error("unexpected unary operator: '" + this.operator);
					}
					return b(this.expression.evaluate());
				}
				toString() {
					return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
				}
			}
			function o(d) {
				return (b, c) => {
					for (let e = 0; e < d.length; e++) {
						const f = d[e](b, c);
						if (f !== "") {
							return f;
						}
					}
					return "";
				};
			}
			function p(a, b) {
				const c = a.substr(b).match(/^\s+/);
				return (c && c[0]) ?? "";
			}
			function q(d, b) {
				const a = d.substr(b).match(/^[0-9]+/);
				return (a && a[0]) ?? "";
			}
			function r(b, c) {
				const f = b.substr(c, 1);
				c += 1;
				if (f.toLowerCase() !== "e") {
					return "";
				}
				const e = function (b, c) {
					const d = q(b, c);
					if (d !== "") {
						return d;
					}
					const e = b.substr(c, 1);
					if (e !== "-" && e !== "+") {
						return "";
					}
					const f = q(b, c += 1);
					if (f === "") {
						return "";
					} else {
						return e + f;
					}
				}(b, c);
				if (e === "") {
					return "";
				} else {
					return f + e;
				}
			}
			function s(b, c) {
				const f = b.substr(c, 1);
				if (f === "0") {
					return f;
				}
				const d = function (a, b) {
					const c = a.substr(b, 1);
					if (c.match(/^[1-9]$/)) {
						return c;
					} else {
						return "";
					}
				}(b, c);
				c += d.length;
				if (d === "") {
					return "";
				} else {
					return d + q(b, c);
				}
			}
			const t = o([function (b, d) {
				const e = s(b, d);
				d += e.length;
				if (e === "") {
					return "";
				}
				const f = b.substr(d, 1);
				d += f.length;
				if (f !== ".") {
					return "";
				}
				const g = q(b, d);
				return e + f + g + r(b, d += g.length);
			}, function (b, c) {
				const f = b.substr(c, 1);
				c += f.length;
				if (f !== ".") {
					return "";
				}
				const d = q(b, c);
				c += d.length;
				if (d === "") {
					return "";
				} else {
					return f + d + r(b, c);
				}
			}, function (b, c) {
				const e = s(b, c);
				c += e.length;
				if (e === "") {
					return "";
				} else {
					return e + r(b, c);
				}
			}]);
			const u = o([function (b, c) {
				const d = b.substr(c, 2);
				c += d.length;
				if (d.toLowerCase() !== "0b") {
					return "";
				}
				const f = function (b, d) {
					const a = b.substr(d).match(/^[01]+/);
					return (a && a[0]) ?? "";
				}(b, c);
				if (f === "") {
					return "";
				} else {
					return d + f;
				}
			}, function (b, c) {
				const f = b.substr(c, 2);
				c += f.length;
				if (f.toLowerCase() !== "0o") {
					return "";
				}
				const e = function (a, b) {
					const c = a.substr(b).match(/^[0-7]+/);
					return (c && c[0]) ?? "";
				}(b, c);
				if (e === "") {
					return "";
				} else {
					return f + e;
				}
			}, function (b, c) {
				const f = b.substr(c, 2);
				c += f.length;
				if (f.toLowerCase() !== "0x") {
					return "";
				}
				const e = function (a, b) {
					const c = a.substr(b).match(/^[0-9a-f]+/i);
					return (c && c[0]) ?? "";
				}(b, c);
				if (e === "") {
					return "";
				} else {
					return f + e;
				}
			}]);
			const v = o([u, t]);
			function w(a, e, b) {
				b += p(e, b).length;
				const d = a.filter(a => e.startsWith(a, b))[0];
				if (d) {
					b += d.length;
					return {
						cursor: b += p(e, b).length,
						operator: d
					};
				} else {
					return null;
				}
			}
			const x = [["**"], ["*", "/", "%"], ["+", "-"], ["<<", ">>>", ">>"], ["&"], ["^"], ["|"]].reduce((b, c) => function (c, d) {
				return (e, f) => {
					const a = c(e, f);
					if (!a) {
						return null;
					}
					f = a.cursor;
					let h = a.evaluable;
					while (true) {
						const g = w(d, e, f);
						if (!g) {
							break;
						}
						f = g.cursor;
						const a = c(e, f);
						if (!a) {
							return null;
						}
						f = a.cursor;
						h = new l(g.operator, h, a.evaluable);
					}
					if (h) {
						return {
							cursor: f,
							evaluable: h
						};
					} else {
						return null;
					}
				};
			}(b, c), function g(b, c) {
				const h = function (b, c) {
					return function (b, c) {
						const e = v(b, c);
						c += e.length;
						if (e === "") {
							return null;
						} else {
							return {
								evaluable: new f(e),
								cursor: c
							};
						}
					}(b, c) ?? function (b, c) {
						const e = b.substr(c, 1);
						c += e.length;
						if (e !== "(") {
							return null;
						}
						const g = y(b, c);
						if (!g) {
							return null;
						}
						c = g.cursor;
						c += p(b, c).length;
						const f = b.substr(c, 1);
						c += f.length;
						if (f !== ")") {
							return null;
						} else {
							return {
								evaluable: g.evaluable,
								cursor: c
							};
						}
					}(b, c);
				}(b, c);
				if (h) {
					return h;
				}
				const i = b.substr(c, 1);
				c += i.length;
				if (i !== "+" && i !== "-" && i !== "~") {
					return null;
				}
				const d = g(b, c);
				if (d) {
					return {
						cursor: c = d.cursor,
						evaluable: new n(i, d.evaluable)
					};
				} else {
					return null;
				}
			});
			function y(b, c) {
				c += p(b, c).length;
				return x(b, c);
			}
			function z(c) {
				const a = function (a) {
					const b = y(a, 0);
					if (b) {
						if (b.cursor + p(a, b.cursor).length !== a.length) {
							return null;
						} else {
							return b.evaluable;
						}
					} else {
						return null;
					}
				}(c);
				return (a == null ? undefined : a.evaluate()) ?? null;
			}
			function B(a) {
				if (typeof a == "number") {
					return a;
				}
				if (typeof a == "string") {
					const b = z(a);
					if (!qh(b)) {
						return b;
					}
				}
				return 0;
			}
			function C(b) {
				return String(b);
			}
			function D(c) {
				return a => a.toFixed(Math.max(Math.min(c, 20), 0));
			}
			function E(b, c, d, e, f) {
				return e + (b - c) / (d - c) * (f - e);
			}
			function F(b) {
				return String(b.toFixed(10)).split(".")[1].replace(/0+$/, "").length;
			}
			function G(d, a, b) {
				return Math.min(Math.max(d, a), b);
			}
			function H(b, c) {
				return (b % c + c) % c;
			}
			function I(b, a) {
				if (qh(b.step)) {
					return Math.max(F(a), 2);
				} else {
					return F(b.step);
				}
			}
			function J(a) {
				return a.step ?? 1;
			}
			function K(b, c) {
				const a = Math.abs(b.step ?? c);
				if (a === 0) {
					return 0.1;
				} else {
					return Math.pow(10, Math.floor(Math.log10(a)) - 1);
				}
			}
			function L(c, a) {
				if (qh(c.step)) {
					return null;
				} else {
					return new j(c.step, a);
				}
			}
			function M(b) {
				if (qh(b.max) || qh(b.min)) {
					if (qh(b.max) && qh(b.min)) {
						return null;
					} else {
						return new d({
							max: b.max,
							min: b.min
						});
					}
				} else {
					return new i({
						max: b.max,
						min: b.min
					});
				}
			}
			function N(c, a) {
				return {
					formatter: c.format ?? D(I(c, a)),
					keyScale: c.keyScale ?? J(c),
					pointerScale: c.pointerScale ?? K(c, a)
				};
			}
			function O(b) {
				return {
					format: b.optional.function,
					keyScale: b.optional.number,
					max: b.optional.number,
					min: b.optional.number,
					pointerScale: b.optional.number,
					step: b.optional.number
				};
			}
			function P(a) {
				return {
					constraint: a.constraint,
					textProps: th.fromObject(N(a.params, a.initialValue))
				};
			}
			class Q {
				constructor(a) {
					this.controller = a;
				}
				get element() {
					return this.controller.view.element;
				}
				get disabled() {
					return this.controller.viewProps.get("disabled");
				}
				set disabled(a) {
					this.controller.viewProps.set("disabled", a);
				}
				get hidden() {
					return this.controller.viewProps.get("hidden");
				}
				set hidden(b) {
					this.controller.viewProps.set("hidden", b);
				}
				dispose() {
					this.controller.viewProps.set("disposed", true);
				}
				importState(a) {
					return this.controller.importState(a);
				}
				exportState() {
					return this.controller.exportState();
				}
			}
			class R {
				constructor(a) {
					this.target = a;
				}
			}
			class S extends R {
				constructor(d, a, b) {
					super(d);
					this.value = a;
					this.last = b == null || b;
				}
			}
			class T extends R {
				constructor(b, c) {
					super(b);
					this.expanded = c;
				}
			}
			class U extends R {
				constructor(b, c) {
					super(b);
					this.index = c;
				}
			}
			class V extends R {
				constructor(c, a) {
					super(c);
					this.native = a;
				}
			}
			class W extends Q {
				constructor(b) {
					super(b);
					this.onValueChange_ = this.onValueChange_.bind(this);
					this.emitter_ = new g();
					this.controller.value.emitter.on("change", this.onValueChange_);
				}
				get label() {
					return this.controller.labelController.props.get("label");
				}
				set label(b) {
					this.controller.labelController.props.set("label", b);
				}
				get key() {
					return this.controller.value.binding.target.key;
				}
				get tag() {
					return this.controller.tag;
				}
				set tag(b) {
					this.controller.tag = b;
				}
				on(b, c) {
					const e = c.bind(this);
					this.emitter_.on(b, b => {
						e(b);
					}, {
						key: c
					});
					return this;
				}
				off(c, a) {
					this.emitter_.off(c, a);
					return this;
				}
				refresh() {
					this.controller.value.fetch();
				}
				onValueChange_(c) {
					const a = this.controller.value;
					this.emitter_.emit("change", new S(this, a.binding.target.read(), c.options.last));
				}
			}
			class X {
				constructor(c, a) {
					this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this);
					this.onValueChange_ = this.onValueChange_.bind(this);
					this.binding = a;
					this.value_ = c;
					this.value_.emitter.on("beforechange", this.onValueBeforeChange_);
					this.value_.emitter.on("change", this.onValueChange_);
					this.emitter = new g();
				}
				get rawValue() {
					return this.value_.rawValue;
				}
				set rawValue(a) {
					this.value_.rawValue = a;
				}
				setRawValue(c, a) {
					this.value_.setRawValue(c, a);
				}
				fetch() {
					this.value_.rawValue = this.binding.read();
				}
				push() {
					this.binding.write(this.value_.rawValue);
				}
				onValueBeforeChange_(b) {
					this.emitter.emit("beforechange", Object.assign(Object.assign({}, b), {
						sender: this
					}));
				}
				onValueChange_(a) {
					this.push();
					this.emitter.emit("change", Object.assign(Object.assign({}, a), {
						sender: this
					}));
				}
			}
			function Y(a) {
				return b => c => {
					if (!b && c === undefined) {
						return {
							succeeded: false,
							value: undefined
						};
					}
					if (b && c === undefined) {
						return {
							succeeded: true,
							value: undefined
						};
					}
					const d = a(c);
					if (d !== undefined) {
						return {
							succeeded: true,
							value: d
						};
					} else {
						return {
							succeeded: false,
							value: undefined
						};
					}
				};
			}
			function Z(a) {
				return {
					custom: c => Y(c)(a),
					boolean: Y(b => typeof b == "boolean" ? b : undefined)(a),
					number: Y(b => typeof b == "number" ? b : undefined)(a),
					string: Y(b => typeof b == "string" ? b : undefined)(a),
					function: Y(b => typeof b == "function" ? b : undefined)(a),
					constant: c => Y(a => a === c ? c : undefined)(a),
					raw: Y(b => b)(a),
					object: c => Y(d => {
						var b;
						if ((b = d) !== null && typeof b == "object") {
							return function (c, d) {
								return Object.keys(d).reduce((e, f) => {
									if (e === undefined) {
										return;
									}
									const a = (0, d[f])(c[f]);
									if (a.succeeded) {
										return Object.assign(Object.assign({}, e), {
											[f]: a.value
										});
									} else {
										return undefined;
									}
								}, {});
							}(d, c);
						}
					})(a),
					array: c => Y(a => {
						var b;
						if (Array.isArray(a)) {
							b = c;
							return a.reduce((e, d) => {
								if (e === undefined) {
									return;
								}
								const a = b(d);
								if (a.succeeded && a.value !== undefined) {
									return [...e, a.value];
								} else {
									return undefined;
								}
							}, []);
						}
					})(a)
				};
			}
			const $ = {
				optional: Z(true),
				required: Z(false)
			};
			function _(e, c) {
				const a = c($);
				const b = $.required.object(a)(e);
				if (b.succeeded) {
					return b.value;
				} else {
					return undefined;
				}
			}
			function aa(b, c, d, e) {
				if (c && !c(b)) {
					return false;
				}
				const f = _(b, d);
				return !!f && e(f);
			}
			function ba(b, c) {
				return bh((b == null ? undefined : b()) ?? {}, c);
			}
			function ca(b) {
				return "value" in b;
			}
			function da(a) {
				return !!e(a) && !!("binding" in a) && dh(a.binding);
			}
			const ea = "http://www.w3.org/2000/svg";
			function fa(a) {
				a.offsetHeight;
			}
			function ga(a) {
				return a.ontouchstart !== undefined;
			}
			const ha = {
				check: "<path d=\"M2 8l4 4l8 -8\"/>",
				dropdown: "<path d=\"M5 7h6l-3 3 z\"/>",
				p2dpad: "<path d=\"M8 4v8\"/><path d=\"M4 8h8\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\"/>"
			};
			function ia(b, c) {
				const a = b.createElementNS(ea, "svg");
				a.innerHTML = ha[c];
				return a;
			}
			function ja(d, a, b) {
				d.insertBefore(a, d.children[b]);
			}
			function ka(a) {
				if (a.parentElement) {
					a.parentElement.removeChild(a);
				}
			}
			function la(a) {
				while (a.children.length > 0) {
					a.removeChild(a.children[0]);
				}
			}
			function ma(a) {
				if (a.relatedTarget) {
					return a.relatedTarget;
				} else if ("explicitOriginalTarget" in a) {
					return a.explicitOriginalTarget;
				} else {
					return null;
				}
			}
			function na(a, d) {
				a.emitter.on("change", a => {
					d(a.rawValue);
				});
				d(a.rawValue);
			}
			function oa(d, a, b) {
				na(d.value(a), b);
			}
			const pa = "tp";
			function qa(a) {
				return (b, c) => [pa, "-", a, "v", b ? "_" + b : "", c ? "-" + c : ""].join("");
			}
			const ra = qa("lbl");
			class sa {
				constructor(f, c) {
					this.element = f.createElement("div");
					this.element.classList.add(ra());
					c.viewProps.bindClassModifiers(this.element);
					const a = f.createElement("div");
					a.classList.add(ra("l"));
					oa(c.props, "label", b => {
						if (qh(b)) {
							this.element.classList.add(ra(undefined, "nol"));
						} else {
							this.element.classList.remove(ra(undefined, "nol"));
							(function (b) {
								while (b.childNodes.length > 0) {
									b.removeChild(b.childNodes[0]);
								}
							})(a);
							a.appendChild(function (b, c) {
								const d = b.createDocumentFragment();
								c.split("\n").map(c => b.createTextNode(c)).forEach((c, a) => {
									if (a > 0) {
										d.appendChild(b.createElement("br"));
									}
									d.appendChild(c);
								});
								return d;
							}(f, b));
						}
					});
					this.element.appendChild(a);
					this.labelElement = a;
					const b = f.createElement("div");
					b.classList.add(ra("v"));
					this.element.appendChild(b);
					this.valueElement = b;
				}
			}
			class ta {
				constructor(b, c) {
					this.props = c.props;
					this.valueController = c.valueController;
					this.viewProps = c.valueController.viewProps;
					this.view = new sa(b, {
						props: c.props,
						viewProps: this.viewProps
					});
					this.view.valueElement.appendChild(this.valueController.view.element);
				}
				importProps(b) {
					return aa(b, null, b => ({
						label: b.optional.string
					}), b => {
						this.props.set("label", b.label);
						return true;
					});
				}
				exportProps() {
					return ba(null, {
						label: this.props.get("label")
					});
				}
			}
			const ua = qa("");
			const va = {
				veryfirst: "vfst",
				first: "fst",
				last: "lst",
				verylast: "vlst"
			};
			class wa {
				constructor(c) {
					this.parent_ = null;
					this.blade = c.blade;
					this.view = c.view;
					this.viewProps = c.viewProps;
					const d = this.view.element;
					this.blade.value("positions").emitter.on("change", () => {
						["veryfirst", "first", "last", "verylast"].forEach(b => {
							d.classList.remove(ua(undefined, va[b]));
						});
						this.blade.get("positions").forEach(b => {
							d.classList.add(ua(undefined, va[b]));
						});
					});
					this.viewProps.handleDispose(() => {
						ka(d);
					});
				}
				get parent() {
					return this.parent_;
				}
				set parent(b) {
					this.parent_ = b;
					this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null);
				}
				importState(b) {
					return aa(b, null, b => ({
						disabled: b.required.boolean,
						hidden: b.required.boolean
					}), b => {
						this.viewProps.importState(b);
						return true;
					});
				}
				exportState() {
					return ba(null, Object.assign({}, this.viewProps.exportState()));
				}
			}
			class xa extends wa {
				constructor(d, b) {
					if (b.value !== b.valueController.value) {
						throw hh.shouldNeverHappen();
					}
					const a = b.valueController.viewProps;
					const e = new ta(d, {
						blade: b.blade,
						props: b.props,
						valueController: b.valueController
					});
					super(Object.assign(Object.assign({}, b), {
						view: new sa(d, {
							props: b.props,
							viewProps: a
						}),
						viewProps: a
					}));
					this.labelController = e;
					this.value = b.value;
					this.valueController = b.valueController;
					this.view.valueElement.appendChild(this.valueController.view.element);
				}
				importState(b) {
					return aa(b, c => {
						var a;
						var f;
						var g;
						return super.importState(c) && this.labelController.importProps(c) && ((g = (f = (a = this.valueController).importProps) === null || f === undefined ? undefined : f.call(a, b)) === null || g === undefined || g);
					}, a => ({
						value: a.optional.raw
					}), b => {
						if (b.value) {
							this.value.rawValue = b.value;
						}
						return true;
					});
				}
				exportState() {
					var b;
					var d;
					return ba(() => super.exportState(), Object.assign(Object.assign({
						value: this.value.rawValue
					}, this.labelController.exportProps()), ((d = (b = this.valueController).exportProps) === null || d === undefined ? undefined : d.call(b)) ?? {}));
				}
			}
			function ya(c) {
				const a = Object.assign({}, c);
				delete a.value;
				return a;
			}
			class za extends xa {
				constructor(b, c) {
					super(b, c);
					this.tag = c.tag;
				}
				importState(c) {
					return aa(c, b => super.importState(ya(c)), a => ({
						tag: a.optional.string
					}), b => {
						this.tag = b.tag;
						return true;
					});
				}
				exportState() {
					return ba(() => ya(super.exportState()), {
						binding: {
							key: this.value.binding.target.key,
							value: this.value.binding.target.read()
						},
						tag: this.tag
					});
				}
			}
			class Aa extends za {
				importState(b) {
					return aa(b, b => super.importState(b), b => ({
						binding: b.required.object({
							value: b.required.raw
						})
					}), b => {
						this.value.binding.inject(b.binding.value);
						this.value.fetch();
						return true;
					});
				}
			}
			function Ba(c, a) {
				while (c.length < a) {
					c.push(undefined);
				}
			}
			function Ca(c) {
				const a = c.indexOf(undefined);
				if (a < 0) {
					return c;
				} else {
					return c.slice(0, a);
				}
			}
			class Da {
				constructor(b) {
					this.emitter = new g();
					this.onTick_ = this.onTick_.bind(this);
					this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this);
					this.onValueChange_ = this.onValueChange_.bind(this);
					this.binding = b.binding;
					this.value_ = sh(function (b) {
						const c = [];
						Ba(c, b);
						return c;
					}(b.bufferSize));
					this.value_.emitter.on("beforechange", this.onValueBeforeChange_);
					this.value_.emitter.on("change", this.onValueChange_);
					this.ticker = b.ticker;
					this.ticker.emitter.on("tick", this.onTick_);
					this.fetch();
				}
				get rawValue() {
					return this.value_.rawValue;
				}
				set rawValue(a) {
					this.value_.rawValue = a;
				}
				setRawValue(c, a) {
					this.value_.setRawValue(c, a);
				}
				fetch() {
					this.value_.rawValue = function (c, a) {
						const b = [...Ca(c), a];
						if (b.length > c.length) {
							b.splice(0, b.length - c.length);
						} else {
							Ba(b, c.length);
						}
						return b;
					}(this.value_.rawValue, this.binding.read());
				}
				onTick_() {
					this.fetch();
				}
				onValueBeforeChange_(b) {
					this.emitter.emit("beforechange", Object.assign(Object.assign({}, b), {
						sender: this
					}));
				}
				onValueChange_(b) {
					this.emitter.emit("change", Object.assign(Object.assign({}, b), {
						sender: this
					}));
				}
			}
			class Ea extends za {
				exportState() {
					return ba(() => super.exportState(), {
						binding: {
							readonly: true
						}
					});
				}
			}
			class Fa extends Q {
				get label() {
					return this.controller.labelController.props.get("label");
				}
				set label(b) {
					this.controller.labelController.props.set("label", b);
				}
				get title() {
					return this.controller.buttonController.props.get("title") ?? "";
				}
				set title(b) {
					this.controller.buttonController.props.set("title", b);
				}
				on(d, b) {
					const a = b.bind(this);
					this.controller.buttonController.emitter.on(d, c => {
						a(new V(this, c.nativeEvent));
					});
					return this;
				}
				off(c, a) {
					this.controller.buttonController.emitter.off(c, a);
					return this;
				}
			}
			function Ga(d, a) {
				return b => {
					(function (d, a, b) {
						if (b) {
							d.classList.add(a);
						} else {
							d.classList.remove(a);
						}
					})(d, a, b);
				};
			}
			function Ha(a, b) {
				na(a, c => {
					b.textContent = c ?? "";
				});
			}
			const Ia = qa("btn");
			class Ja {
				constructor(c, d) {
					this.element = c.createElement("div");
					this.element.classList.add(Ia());
					d.viewProps.bindClassModifiers(this.element);
					const a = c.createElement("button");
					a.classList.add(Ia("b"));
					d.viewProps.bindDisabled(a);
					this.element.appendChild(a);
					this.buttonElement = a;
					const e = c.createElement("div");
					e.classList.add(Ia("t"));
					Ha(d.props.value("title"), e);
					this.buttonElement.appendChild(e);
				}
			}
			class Ka {
				constructor(b, c) {
					this.emitter = new g();
					this.onClick_ = this.onClick_.bind(this);
					this.props = c.props;
					this.viewProps = c.viewProps;
					this.view = new Ja(b, {
						props: this.props,
						viewProps: this.viewProps
					});
					this.view.buttonElement.addEventListener("click", this.onClick_);
				}
				importProps(b) {
					return aa(b, null, b => ({
						title: b.optional.string
					}), b => {
						this.props.set("title", b.title);
						return true;
					});
				}
				exportProps() {
					return ba(null, {
						title: this.props.get("title")
					});
				}
				onClick_(b) {
					this.emitter.emit("click", {
						nativeEvent: b,
						sender: this
					});
				}
			}
			class La extends wa {
				constructor(e, d) {
					const a = new Ka(e, {
						props: d.buttonProps,
						viewProps: d.viewProps
					});
					const b = new ta(e, {
						blade: d.blade,
						props: d.labelProps,
						valueController: a
					});
					super({
						blade: d.blade,
						view: b.view,
						viewProps: d.viewProps
					});
					this.buttonController = a;
					this.labelController = b;
				}
				importState(b) {
					return aa(b, b => super.importState(b) && this.buttonController.importProps(b) && this.labelController.importProps(b), () => ({}), () => true);
				}
				exportState() {
					return ba(() => super.exportState(), Object.assign(Object.assign({}, this.buttonController.exportProps()), this.labelController.exportProps()));
				}
			}
			class Ma {
				constructor(c) {
					const [d, e] = c.split("-");
					const a = d.split(".");
					this.major = parseInt(a[0], 10);
					this.minor = parseInt(a[1], 10);
					this.patch = parseInt(a[2], 10);
					this.prerelease = e ?? null;
				}
				toString() {
					const a = [this.major, this.minor, this.patch].join(".");
					if (this.prerelease !== null) {
						return [a, this.prerelease].join("-");
					} else {
						return a;
					}
				}
			}
			const Na = new Ma("2.0.3");
			function Oa(a) {
				return Object.assign({
					core: Na
				}, a);
			}
			const Pa = Oa({
				id: "button",
				type: "blade",
				accept(b) {
					const c = _(b, b => ({
						title: b.required.string,
						view: b.required.constant("button"),
						label: b.optional.string
					}));
					if (c) {
						return {
							params: c
						};
					} else {
						return null;
					}
				},
				controller: b => new La(b.document, {
					blade: b.blade,
					buttonProps: th.fromObject({
						title: b.params.title
					}),
					labelProps: th.fromObject({
						label: b.params.label
					}),
					viewProps: b.viewProps
				}),
				api: b => b.controller instanceof La ? new Fa(b.controller) : null
			});
			class Qa {
				constructor(c, a) {
					this.onRackValueChange_ = this.onRackValueChange_.bind(this);
					this.controller_ = c;
					this.emitter_ = new g();
					this.pool_ = a;
					this.controller_.rack.emitter.on("valuechange", this.onRackValueChange_);
				}
				get children() {
					return this.controller_.rack.children.map(b => this.pool_.createApi(b));
				}
				addBinding(f, g, b) {
					const c = b ?? {};
					const h = this.controller_.element.ownerDocument;
					const a = this.pool_.createBinding(h, function (c, a) {
						if (!rh.isBindable(c)) {
							throw hh.notBindable();
						}
						return new rh(c, a);
					}(f, g), c);
					const d = this.pool_.createBindingApi(a);
					return this.add(d, c.index);
				}
				addFolder(b) {
					return function (c, b) {
						return c.addBlade(Object.assign(Object.assign({}, b), {
							view: "folder"
						}));
					}(this, b);
				}
				addButton(b) {
					return function (c, a) {
						return c.addBlade(Object.assign(Object.assign({}, a), {
							view: "button"
						}));
					}(this, b);
				}
				addTab(b) {
					return function (c, b) {
						return c.addBlade(Object.assign(Object.assign({}, b), {
							view: "tab"
						}));
					}(this, b);
				}
				add(b, c) {
					const a = b.controller;
					this.controller_.rack.add(a, c);
					return b;
				}
				remove(b) {
					this.controller_.rack.remove(b.controller);
				}
				addBlade(c) {
					const d = this.controller_.element.ownerDocument;
					const e = this.pool_.createBlade(d, c);
					const a = this.pool_.createApi(e);
					return this.add(a, c.index);
				}
				on(d, a) {
					const b = a.bind(this);
					this.emitter_.on(d, c => {
						b(c);
					}, {
						key: a
					});
					return this;
				}
				off(c, a) {
					this.emitter_.off(c, a);
					return this;
				}
				refresh() {
					this.children.forEach(c => {
						var a;
						if (e(a = c) && "refresh" in a && typeof a.refresh == "function") {
							c.refresh();
						}
					});
				}
				onRackValueChange_(d) {
					const a = d.bladeController;
					const e = this.pool_.createApi(a);
					const b = da(a.value) ? a.value.binding : null;
					this.emitter_.emit("change", new S(e, b ? b.target.read() : a.value.rawValue, d.options.last));
				}
			}
			class Ra extends Q {
				constructor(c, a) {
					super(c);
					this.rackApi_ = new Qa(c.rackController, a);
				}
				refresh() {
					this.rackApi_.refresh();
				}
			}
			class Sa extends wa {
				constructor(b) {
					super({
						blade: b.blade,
						view: b.view,
						viewProps: b.rackController.viewProps
					});
					this.rackController = b.rackController;
				}
				importState(b) {
					return aa(b, b => super.importState(b), b => ({
						children: b.required.array(b.required.raw)
					}), c => this.rackController.rack.children.every((a, b) => a.importState(c.children[b])));
				}
				exportState() {
					return ba(() => super.exportState(), {
						children: this.rackController.rack.children.map(b => b.exportState())
					});
				}
			}
			function Ta(a) {
				return "rackController" in a;
			}
			class Ua {
				constructor(b) {
					this.emitter = new g();
					this.items_ = [];
					this.cache_ = new Set();
					this.onSubListAdd_ = this.onSubListAdd_.bind(this);
					this.onSubListRemove_ = this.onSubListRemove_.bind(this);
					this.extract_ = b;
				}
				get items() {
					return this.items_;
				}
				allItems() {
					return Array.from(this.cache_);
				}
				find(c) {
					for (const a of this.allItems()) {
						if (c(a)) {
							return a;
						}
					}
					return null;
				}
				includes(b) {
					return this.cache_.has(b);
				}
				add(c, d) {
					if (this.includes(c)) {
						throw hh.shouldNeverHappen();
					}
					const a = d !== undefined ? d : this.items_.length;
					this.items_.splice(a, 0, c);
					this.cache_.add(c);
					const e = this.extract_(c);
					if (e) {
						e.emitter.on("add", this.onSubListAdd_);
						e.emitter.on("remove", this.onSubListRemove_);
						e.allItems().forEach(a => {
							this.cache_.add(a);
						});
					}
					this.emitter.emit("add", {
						index: a,
						item: c,
						root: this,
						target: this
					});
				}
				remove(a) {
					const b = this.items_.indexOf(a);
					if (b < 0) {
						return;
					}
					this.items_.splice(b, 1);
					this.cache_.delete(a);
					const d = this.extract_(a);
					if (d) {
						d.allItems().forEach(a => {
							this.cache_.delete(a);
						});
						d.emitter.off("add", this.onSubListAdd_);
						d.emitter.off("remove", this.onSubListRemove_);
					}
					this.emitter.emit("remove", {
						index: b,
						item: a,
						root: this,
						target: this
					});
				}
				onSubListAdd_(a) {
					this.cache_.add(a.item);
					this.emitter.emit("add", {
						index: a.index,
						item: a.item,
						root: this,
						target: a.target
					});
				}
				onSubListRemove_(a) {
					this.cache_.delete(a.item);
					this.emitter.emit("remove", {
						index: a.index,
						item: a.item,
						root: this,
						target: a.target
					});
				}
			}
			function Va(b) {
				if (Ta(b)) {
					return b.rackController.rack.bcSet_;
				} else {
					return null;
				}
			}
			class Wa {
				constructor(a) {
					var b;
					this.emitter = new g();
					this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this);
					this.onSetAdd_ = this.onSetAdd_.bind(this);
					this.onSetRemove_ = this.onSetRemove_.bind(this);
					this.onChildDispose_ = this.onChildDispose_.bind(this);
					this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this);
					this.onChildValueChange_ = this.onChildValueChange_.bind(this);
					this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this);
					this.onRackLayout_ = this.onRackLayout_.bind(this);
					this.onRackValueChange_ = this.onRackValueChange_.bind(this);
					this.blade_ = a.blade ?? null;
					if ((b = this.blade_) !== null && b !== undefined) {
						b.value("positions").emitter.on("change", this.onBladePositionsChange_);
					}
					this.viewProps = a.viewProps;
					this.bcSet_ = new Ua(Va);
					this.bcSet_.emitter.on("add", this.onSetAdd_);
					this.bcSet_.emitter.on("remove", this.onSetRemove_);
				}
				get children() {
					return this.bcSet_.items;
				}
				add(b, c) {
					var a;
					if ((a = b.parent) !== null && a !== undefined) {
						a.remove(b);
					}
					b.parent = this;
					this.bcSet_.add(b, c);
				}
				remove(a) {
					a.parent = null;
					this.bcSet_.remove(a);
				}
				find(a) {
					return this.bcSet_.allItems().filter(a);
				}
				onSetAdd_(d) {
					this.updatePositions_();
					const a = d.target === d.root;
					this.emitter.emit("add", {
						bladeController: d.item,
						index: d.index,
						root: a,
						sender: this
					});
					if (!a) {
						return;
					}
					const b = d.item;
					b.viewProps.emitter.on("change", this.onChildViewPropsChange_);
					b.blade.value("positions").emitter.on("change", this.onChildPositionsChange_);
					b.viewProps.handleDispose(this.onChildDispose_);
					if (ca(b)) {
						b.value.emitter.on("change", this.onChildValueChange_);
					} else if (Ta(b)) {
						const d = b.rackController.rack;
						if (d) {
							const a = d.emitter;
							a.on("layout", this.onRackLayout_);
							a.on("valuechange", this.onRackValueChange_);
						}
					}
				}
				onSetRemove_(c) {
					this.updatePositions_();
					const a = c.target === c.root;
					this.emitter.emit("remove", {
						bladeController: c.item,
						root: a,
						sender: this
					});
					if (!a) {
						return;
					}
					const b = c.item;
					if (ca(b)) {
						b.value.emitter.off("change", this.onChildValueChange_);
					} else if (Ta(b)) {
						const c = b.rackController.rack;
						if (c) {
							const a = c.emitter;
							a.off("layout", this.onRackLayout_);
							a.off("valuechange", this.onRackValueChange_);
						}
					}
				}
				updatePositions_() {
					const c = this.bcSet_.items.filter(b => !b.viewProps.get("hidden"));
					const d = c[0];
					const b = c[c.length - 1];
					this.bcSet_.items.forEach(e => {
						const a = [];
						if (e === d) {
							a.push("first");
							if (!this.blade_ || !!this.blade_.get("positions").includes("veryfirst")) {
								a.push("veryfirst");
							}
						}
						if (e === b) {
							a.push("last");
							if (!this.blade_ || !!this.blade_.get("positions").includes("verylast")) {
								a.push("verylast");
							}
						}
						e.blade.set("positions", a);
					});
				}
				onChildPositionsChange_() {
					this.updatePositions_();
					this.emitter.emit("layout", {
						sender: this
					});
				}
				onChildViewPropsChange_(a) {
					this.updatePositions_();
					this.emitter.emit("layout", {
						sender: this
					});
				}
				onChildDispose_() {
					this.bcSet_.items.filter(b => b.viewProps.get("disposed")).forEach(b => {
						this.bcSet_.remove(b);
					});
				}
				onChildValueChange_(a) {
					const b = function (b, c) {
						for (let d = 0; d < b.length; d++) {
							const e = b[d];
							if (ca(e) && e.value === c) {
								return e;
							}
						}
						return null;
					}(this.find(ca), a.sender);
					if (!b) {
						throw hh.alreadyDisposed();
					}
					this.emitter.emit("valuechange", {
						bladeController: b,
						options: a.options,
						sender: this
					});
				}
				onRackLayout_(b) {
					this.updatePositions_();
					this.emitter.emit("layout", {
						sender: this
					});
				}
				onRackValueChange_(b) {
					this.emitter.emit("valuechange", {
						bladeController: b.bladeController,
						options: b.options,
						sender: this
					});
				}
				onBladePositionsChange_() {
					this.updatePositions_();
				}
			}
			class Xa {
				constructor(c) {
					this.onRackAdd_ = this.onRackAdd_.bind(this);
					this.onRackRemove_ = this.onRackRemove_.bind(this);
					this.element = c.element;
					this.viewProps = c.viewProps;
					const b = new Wa({
						blade: c.root ? undefined : c.blade,
						viewProps: c.viewProps
					});
					b.emitter.on("add", this.onRackAdd_);
					b.emitter.on("remove", this.onRackRemove_);
					this.rack = b;
					this.viewProps.handleDispose(() => {
						for (let b = this.rack.children.length - 1; b >= 0; b--) {
							this.rack.children[b].viewProps.set("disposed", true);
						}
					});
				}
				onRackAdd_(b) {
					if (b.root) {
						ja(this.element, b.bladeController.view.element, b.index);
					}
				}
				onRackRemove_(b) {
					if (b.root) {
						ka(b.bladeController.view.element);
					}
				}
			}
			function Ya() {
				return new th({
					positions: sh([], {
						equals: A
					})
				});
			}
			class Za extends th {
				constructor(b) {
					super(b);
				}
				static create(a) {
					const b = {
						completed: true,
						expanded: a,
						expandedHeight: null,
						shouldFixHeight: false,
						temporaryExpanded: null
					};
					const c = th.createCore(b);
					return new Za(c);
				}
				get styleExpanded() {
					return this.get("temporaryExpanded") ?? this.get("expanded");
				}
				get styleHeight() {
					if (!this.styleExpanded) {
						return "0";
					}
					const b = this.get("expandedHeight");
					if (this.get("shouldFixHeight") && !qh(b)) {
						return b + "px";
					} else {
						return "auto";
					}
				}
				bindExpandedClass(a, b) {
					const c = () => {
						if (this.styleExpanded) {
							a.classList.add(b);
						} else {
							a.classList.remove(b);
						}
					};
					oa(this, "expanded", c);
					oa(this, "temporaryExpanded", c);
				}
				cleanUpTransition() {
					this.set("shouldFixHeight", false);
					this.set("expandedHeight", null);
					this.set("completed", true);
				}
			}
			function $a(b, a) {
				a.style.height = b.styleHeight;
			}
			function _a(c, a) {
				c.value("expanded").emitter.on("beforechange", () => {
					c.set("completed", false);
					if (qh(c.get("expandedHeight"))) {
						const b = function (f, d) {
							let e = 0;
							(function (g, b) {
								const a = g.style.transition;
								g.style.transition = "none";
								f.set("expandedHeight", null);
								f.set("temporaryExpanded", true);
								fa(d);
								e = d.clientHeight;
								f.set("temporaryExpanded", null);
								fa(d);
								g.style.transition = a;
							})(d);
							return e;
						}(c, a);
						if (b > 0) {
							c.set("expandedHeight", b);
						}
					}
					c.set("shouldFixHeight", true);
					fa(a);
				});
				c.emitter.on("change", () => {
					$a(c, a);
				});
				$a(c, a);
				a.addEventListener("transitionend", a => {
					if (a.propertyName === "height") {
						c.cleanUpTransition();
					}
				});
			}
			class ab extends Ra {
				constructor(b, c) {
					super(b, c);
					this.emitter_ = new g();
					this.controller.foldable.value("expanded").emitter.on("change", a => {
						this.emitter_.emit("fold", new T(this, a.sender.rawValue));
					});
					this.rackApi_.on("change", a => {
						this.emitter_.emit("change", a);
					});
				}
				get expanded() {
					return this.controller.foldable.get("expanded");
				}
				set expanded(a) {
					this.controller.foldable.set("expanded", a);
				}
				get title() {
					return this.controller.props.get("title");
				}
				set title(a) {
					this.controller.props.set("title", a);
				}
				get children() {
					return this.rackApi_.children;
				}
				addBinding(d, a, b) {
					return this.rackApi_.addBinding(d, a, b);
				}
				addFolder(b) {
					return this.rackApi_.addFolder(b);
				}
				addButton(a) {
					return this.rackApi_.addButton(a);
				}
				addTab(a) {
					return this.rackApi_.addTab(a);
				}
				add(c, a) {
					return this.rackApi_.add(c, a);
				}
				remove(b) {
					this.rackApi_.remove(b);
				}
				addBlade(a) {
					return this.rackApi_.addBlade(a);
				}
				on(b, a) {
					const c = a.bind(this);
					this.emitter_.on(b, b => {
						c(b);
					}, {
						key: a
					});
					return this;
				}
				off(c, a) {
					this.emitter_.off(c, a);
					return this;
				}
			}
			const bb = qa("cnt");
			class cb {
				constructor(f, e) {
					this.className_ = qa(e.viewName ?? "fld");
					this.element = f.createElement("div");
					this.element.classList.add(this.className_(), bb());
					e.viewProps.bindClassModifiers(this.element);
					this.foldable_ = e.foldable;
					this.foldable_.bindExpandedClass(this.element, this.className_(undefined, "expanded"));
					oa(this.foldable_, "completed", Ga(this.element, this.className_(undefined, "cpl")));
					const g = f.createElement("button");
					g.classList.add(this.className_("b"));
					oa(e.props, "title", b => {
						if (qh(b)) {
							this.element.classList.add(this.className_(undefined, "not"));
						} else {
							this.element.classList.remove(this.className_(undefined, "not"));
						}
					});
					e.viewProps.bindDisabled(g);
					this.element.appendChild(g);
					this.buttonElement = g;
					const b = f.createElement("div");
					b.classList.add(this.className_("i"));
					this.element.appendChild(b);
					const h = f.createElement("div");
					h.classList.add(this.className_("t"));
					Ha(e.props.value("title"), h);
					this.buttonElement.appendChild(h);
					this.titleElement = h;
					const a = f.createElement("div");
					a.classList.add(this.className_("m"));
					this.buttonElement.appendChild(a);
					const c = f.createElement("div");
					c.classList.add(this.className_("c"));
					this.element.appendChild(c);
					this.containerElement = c;
				}
			}
			class db extends Sa {
				constructor(c, a) {
					var d;
					const e = Za.create((d = a.expanded) === null || d === undefined || d);
					const f = new cb(c, {
						foldable: e,
						props: a.props,
						viewName: a.root ? "rot" : undefined,
						viewProps: a.viewProps
					});
					super(Object.assign(Object.assign({}, a), {
						rackController: new Xa({
							blade: a.blade,
							element: f.containerElement,
							root: a.root,
							viewProps: a.viewProps
						}),
						view: f
					}));
					this.onTitleClick_ = this.onTitleClick_.bind(this);
					this.props = a.props;
					this.foldable = e;
					_a(this.foldable, this.view.containerElement);
					this.rackController.rack.emitter.on("add", () => {
						this.foldable.cleanUpTransition();
					});
					this.rackController.rack.emitter.on("remove", () => {
						this.foldable.cleanUpTransition();
					});
					this.view.buttonElement.addEventListener("click", this.onTitleClick_);
				}
				get document() {
					return this.view.element.ownerDocument;
				}
				importState(b) {
					return aa(b, b => super.importState(b), b => ({
						expanded: b.required.boolean,
						title: b.optional.string
					}), b => {
						this.foldable.set("expanded", b.expanded);
						this.props.set("title", b.title);
						return true;
					});
				}
				exportState() {
					return ba(() => super.exportState(), {
						expanded: this.foldable.get("expanded"),
						title: this.props.get("title")
					});
				}
				onTitleClick_() {
					this.foldable.set("expanded", !this.foldable.get("expanded"));
				}
			}
			const eb = Oa({
				id: "folder",
				type: "blade",
				accept(c) {
					const b = _(c, b => ({
						title: b.required.string,
						view: b.required.constant("folder"),
						expanded: b.optional.boolean
					}));
					if (b) {
						return {
							params: b
						};
					} else {
						return null;
					}
				},
				controller: b => new db(b.document, {
					blade: b.blade,
					expanded: b.params.expanded,
					props: th.fromObject({
						title: b.params.title
					}),
					viewProps: b.viewProps
				}),
				api: b => b.controller instanceof db ? new ab(b.controller, b.pool) : null
			});
			const fb = qa("");
			function gb(b, c) {
				return Ga(b, fb(undefined, c));
			}
			class hb extends th {
				constructor(a) {
					var b;
					var e;
					super(a);
					this.onDisabledChange_ = this.onDisabledChange_.bind(this);
					this.onParentChange_ = this.onParentChange_.bind(this);
					this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this);
					[this.globalDisabled_, this.setGlobalDisabled_] = (e = sh(this.getGlobalDisabled_()), [new h(e), (b, c) => {
						e.setRawValue(b, c);
					}]);
					this.value("disabled").emitter.on("change", this.onDisabledChange_);
					this.value("parent").emitter.on("change", this.onParentChange_);
					if ((b = this.get("parent")) !== null && b !== undefined) {
						b.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
					}
				}
				static create(d) {
					var a;
					var f;
					const g = d ?? {};
					return new hb(th.createCore({
						disabled: (a = g.disabled) !== null && a !== undefined && a,
						disposed: false,
						hidden: (f = g.hidden) !== null && f !== undefined && f,
						parent: g.parent ?? null
					}));
				}
				get globalDisabled() {
					return this.globalDisabled_;
				}
				bindClassModifiers(b) {
					na(this.globalDisabled_, gb(b, "disabled"));
					oa(this, "hidden", gb(b, "hidden"));
				}
				bindDisabled(c) {
					na(this.globalDisabled_, a => {
						c.disabled = a;
					});
				}
				bindTabIndex(c) {
					na(this.globalDisabled_, a => {
						c.tabIndex = a ? -1 : 0;
					});
				}
				handleDispose(b) {
					this.value("disposed").emitter.on("change", a => {
						if (a) {
							b();
						}
					});
				}
				importState(b) {
					this.set("disabled", b.disabled);
					this.set("hidden", b.hidden);
				}
				exportState() {
					return {
						disabled: this.get("disabled"),
						hidden: this.get("hidden")
					};
				}
				getGlobalDisabled_() {
					const b = this.get("parent");
					return !!b && b.globalDisabled.rawValue || this.get("disabled");
				}
				updateGlobalDisabled_() {
					this.setGlobalDisabled_(this.getGlobalDisabled_());
				}
				onDisabledChange_() {
					this.updateGlobalDisabled_();
				}
				onParentGlobalDisabledChange_() {
					this.updateGlobalDisabled_();
				}
				onParentChange_(a) {
					var b;
					const e = a.previousRawValue;
					if (e != null) {
						e.globalDisabled.emitter.off("change", this.onParentGlobalDisabledChange_);
					}
					if ((b = this.get("parent")) !== null && b !== undefined) {
						b.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
					}
					this.updateGlobalDisabled_();
				}
			}
			const ib = qa("tbp");
			class jb {
				constructor(b, c) {
					this.element = b.createElement("div");
					this.element.classList.add(ib());
					c.viewProps.bindClassModifiers(this.element);
					const a = b.createElement("div");
					a.classList.add(ib("c"));
					this.element.appendChild(a);
					this.containerElement = a;
				}
			}
			const kb = qa("tbi");
			class lb {
				constructor(d, e) {
					this.element = d.createElement("div");
					this.element.classList.add(kb());
					e.viewProps.bindClassModifiers(this.element);
					oa(e.props, "selected", a => {
						if (a) {
							this.element.classList.add(kb(undefined, "sel"));
						} else {
							this.element.classList.remove(kb(undefined, "sel"));
						}
					});
					const a = d.createElement("button");
					a.classList.add(kb("b"));
					e.viewProps.bindDisabled(a);
					this.element.appendChild(a);
					this.buttonElement = a;
					const b = d.createElement("div");
					b.classList.add(kb("t"));
					Ha(e.props.value("title"), b);
					this.buttonElement.appendChild(b);
					this.titleElement = b;
				}
			}
			class mb {
				constructor(c, b) {
					this.emitter = new g();
					this.onClick_ = this.onClick_.bind(this);
					this.props = b.props;
					this.viewProps = b.viewProps;
					this.view = new lb(c, {
						props: b.props,
						viewProps: b.viewProps
					});
					this.view.buttonElement.addEventListener("click", this.onClick_);
				}
				onClick_() {
					this.emitter.emit("click", {
						sender: this
					});
				}
			}
			class nb extends Sa {
				constructor(d, a) {
					const b = new jb(d, {
						viewProps: a.viewProps
					});
					super(Object.assign(Object.assign({}, a), {
						rackController: new Xa({
							blade: a.blade,
							element: b.containerElement,
							viewProps: a.viewProps
						}),
						view: b
					}));
					this.onItemClick_ = this.onItemClick_.bind(this);
					this.ic_ = new mb(d, {
						props: a.itemProps,
						viewProps: hb.create()
					});
					this.ic_.emitter.on("click", this.onItemClick_);
					this.props = a.props;
					oa(this.props, "selected", b => {
						this.itemController.props.set("selected", b);
						this.viewProps.set("hidden", !b);
					});
				}
				get itemController() {
					return this.ic_;
				}
				importState(b) {
					return aa(b, b => super.importState(b), b => ({
						selected: b.required.boolean,
						title: b.required.string
					}), b => {
						this.ic_.props.set("selected", b.selected);
						this.ic_.props.set("title", b.title);
						return true;
					});
				}
				exportState() {
					return ba(() => super.exportState(), {
						selected: this.ic_.props.get("selected"),
						title: this.ic_.props.get("title")
					});
				}
				onItemClick_() {
					this.props.set("selected", true);
				}
			}
			class ob extends Ra {
				constructor(b, c) {
					super(b, c);
					this.emitter_ = new g();
					this.onSelect_ = this.onSelect_.bind(this);
					this.pool_ = c;
					this.rackApi_.on("change", a => {
						this.emitter_.emit("change", a);
					});
					this.controller.tab.selectedIndex.emitter.on("change", this.onSelect_);
				}
				get pages() {
					return this.rackApi_.children;
				}
				addPage(b) {
					const c = this.controller.view.element.ownerDocument;
					const d = new nb(c, {
						blade: Ya(),
						itemProps: th.fromObject({
							selected: false,
							title: b.title
						}),
						props: th.fromObject({
							selected: false
						}),
						viewProps: hb.create()
					});
					const e = this.pool_.createApi(d);
					return this.rackApi_.add(e, b.index);
				}
				removePage(a) {
					this.rackApi_.remove(this.rackApi_.children[a]);
				}
				on(b, c) {
					const e = c.bind(this);
					this.emitter_.on(b, b => {
						e(b);
					}, {
						key: c
					});
					return this;
				}
				off(c, b) {
					this.emitter_.off(c, b);
					return this;
				}
				onSelect_(a) {
					this.emitter_.emit("select", new U(this, a.rawValue));
				}
			}
			class pb extends Ra {
				get title() {
					return this.controller.itemController.props.get("title") ?? "";
				}
				set title(b) {
					this.controller.itemController.props.set("title", b);
				}
				get selected() {
					return this.controller.props.get("selected");
				}
				set selected(b) {
					this.controller.props.set("selected", b);
				}
				get children() {
					return this.rackApi_.children;
				}
				addButton(a) {
					return this.rackApi_.addButton(a);
				}
				addFolder(a) {
					return this.rackApi_.addFolder(a);
				}
				addTab(a) {
					return this.rackApi_.addTab(a);
				}
				add(c, b) {
					this.rackApi_.add(c, b);
				}
				remove(a) {
					this.rackApi_.remove(a);
				}
				addBinding(d, a, b) {
					return this.rackApi_.addBinding(d, a, b);
				}
				addBlade(b) {
					return this.rackApi_.addBlade(b);
				}
			}
			class qb {
				constructor() {
					this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this);
					this.empty = sh(true);
					this.selectedIndex = sh(-1);
					this.items_ = [];
				}
				add(b, c) {
					const a = c ?? this.items_.length;
					this.items_.splice(a, 0, b);
					b.emitter.on("change", this.onItemSelectedChange_);
					this.keepSelection_();
				}
				remove(a) {
					const b = this.items_.indexOf(a);
					if (b >= 0) {
						this.items_.splice(b, 1);
						a.emitter.off("change", this.onItemSelectedChange_);
						this.keepSelection_();
					}
				}
				keepSelection_() {
					if (this.items_.length === 0) {
						this.selectedIndex.rawValue = -1;
						this.empty.rawValue = true;
						return;
					}
					const b = this.items_.findIndex(b => b.rawValue);
					if (b < 0) {
						this.items_.forEach((c, a) => {
							c.rawValue = a === 0;
						});
						this.selectedIndex.rawValue = 0;
					} else {
						this.items_.forEach((a, c) => {
							a.rawValue = c === b;
						});
						this.selectedIndex.rawValue = b;
					}
					this.empty.rawValue = false;
				}
				onItemSelectedChange_(c) {
					if (c.rawValue) {
						const e = this.items_.findIndex(b => b === c.sender);
						this.items_.forEach((a, b) => {
							a.rawValue = b === e;
						});
						this.selectedIndex.rawValue = e;
					} else {
						this.keepSelection_();
					}
				}
			}
			const rb = qa("tab");
			class sb {
				constructor(d, f) {
					this.element = d.createElement("div");
					this.element.classList.add(rb(), bb());
					f.viewProps.bindClassModifiers(this.element);
					na(f.empty, Ga(this.element, rb(undefined, "nop")));
					const a = d.createElement("div");
					a.classList.add(rb("t"));
					this.element.appendChild(a);
					this.itemsElement = a;
					const e = d.createElement("div");
					e.classList.add(rb("i"));
					this.element.appendChild(e);
					const b = d.createElement("div");
					b.classList.add(rb("c"));
					this.element.appendChild(b);
					this.contentsElement = b;
				}
			}
			class tb extends Sa {
				constructor(d, e) {
					const a = new qb();
					const f = new sb(d, {
						empty: a.empty,
						viewProps: e.viewProps
					});
					super({
						blade: e.blade,
						rackController: new Xa({
							blade: e.blade,
							element: f.contentsElement,
							viewProps: e.viewProps
						}),
						view: f
					});
					this.onRackAdd_ = this.onRackAdd_.bind(this);
					this.onRackRemove_ = this.onRackRemove_.bind(this);
					const b = this.rackController.rack;
					b.emitter.on("add", this.onRackAdd_);
					b.emitter.on("remove", this.onRackRemove_);
					this.tab = a;
				}
				add(c, a) {
					this.rackController.rack.add(c, a);
				}
				remove(b) {
					this.rackController.rack.remove(this.rackController.rack.children[b]);
				}
				onRackAdd_(a) {
					if (!a.root) {
						return;
					}
					const b = a.bladeController;
					ja(this.view.itemsElement, b.itemController.view.element, a.index);
					b.itemController.viewProps.set("parent", this.viewProps);
					this.tab.add(b.props.value("selected"));
				}
				onRackRemove_(a) {
					if (!a.root) {
						return;
					}
					const b = a.bladeController;
					ka(b.itemController.view.element);
					b.itemController.viewProps.set("parent", null);
					this.tab.remove(b.props.value("selected"));
				}
			}
			const ub = Oa({
				id: "tab",
				type: "blade",
				accept(c) {
					const b = _(c, b => ({
						pages: b.required.array(b.required.object({
							title: b.required.string
						})),
						view: b.required.constant("tab")
					}));
					if (b && b.pages.length !== 0) {
						return {
							params: b
						};
					} else {
						return null;
					}
				},
				controller(b) {
					const d = new tb(b.document, {
						blade: b.blade,
						viewProps: b.viewProps
					});
					b.params.pages.forEach(a => {
						const e = new nb(b.document, {
							blade: Ya(),
							itemProps: th.fromObject({
								selected: false,
								title: a.title
							}),
							props: th.fromObject({
								selected: false
							}),
							viewProps: hb.create()
						});
						d.add(e);
					});
					return d;
				},
				api: b => b.controller instanceof tb ? new ob(b.controller, b.pool) : b.controller instanceof nb ? new pb(b.controller, b.pool) : null
			});
			class vb extends W {
				get options() {
					return this.controller.valueController.props.get("options");
				}
				set options(a) {
					this.controller.valueController.props.set("options", a);
				}
			}
			class wb {
				constructor() {
					this.disabled = false;
					this.emitter = new g();
				}
				dispose() { }
				tick() {
					if (!this.disabled) {
						this.emitter.emit("tick", {
							sender: this
						});
					}
				}
			}
			class xb {
				constructor(c, a) {
					this.disabled_ = false;
					this.timerId_ = null;
					this.onTick_ = this.onTick_.bind(this);
					this.doc_ = c;
					this.emitter = new g();
					this.interval_ = a;
					this.setTimer_();
				}
				get disabled() {
					return this.disabled_;
				}
				set disabled(a) {
					this.disabled_ = a;
					if (this.disabled_) {
						this.clearTimer_();
					} else {
						this.setTimer_();
					}
				}
				dispose() {
					this.clearTimer_();
				}
				clearTimer_() {
					if (this.timerId_ === null) {
						return;
					}
					const b = this.doc_.defaultView;
					if (b) {
						b.clearInterval(this.timerId_);
					}
					this.timerId_ = null;
				}
				setTimer_() {
					this.clearTimer_();
					if (this.interval_ <= 0) {
						return;
					}
					const b = this.doc_.defaultView;
					if (b) {
						this.timerId_ = b.setInterval(this.onTick_, this.interval_);
					}
				}
				onTick_() {
					if (!this.disabled_) {
						this.emitter.emit("tick", {
							sender: this
						});
					}
				}
			}
			class yb {
				constructor(a) {
					this.constraints = a;
				}
				constrain(b) {
					return this.constraints.reduce((c, a) => a.constrain(c), b);
				}
			}
			function zb(d, c) {
				if (d instanceof c) {
					return d;
				}
				if (d instanceof yb) {
					const b = d.constraints.reduce((b, a) => b || (a instanceof c ? a : null), null);
					if (b) {
						return b;
					}
				}
				return null;
			}
			class Ab {
				constructor(b) {
					this.values = th.fromObject({
						options: b
					});
				}
				constrain(d) {
					const b = this.values.get("options");
					if (b.length === 0 || b.filter(a => a.value === d).length > 0) {
						return d;
					} else {
						return b[0].value;
					}
				}
			}
			function Bb(c) {
				const b = $;
				if (Array.isArray(c)) {
					return _({
						items: c
					}, b => ({
						items: b.required.array(b.required.object({
							text: b.required.string,
							value: b.required.raw
						}))
					}))?.items;
				} else if (typeof c == "object") {
					return b.required.raw(c).value;
				} else {
					return undefined;
				}
			}
			function Cb(d) {
				if (Array.isArray(d)) {
					return d;
				}
				const a = [];
				Object.keys(d).forEach(b => {
					a.push({
						text: b,
						value: d[b]
					});
				});
				return a;
			}
			function Db(b) {
				if (qh(b)) {
					return null;
				} else {
					return new Ab(Cb(b));
				}
			}
			const Eb = qa("lst");
			class Fb {
				constructor(f, c) {
					this.onValueChange_ = this.onValueChange_.bind(this);
					this.props_ = c.props;
					this.element = f.createElement("div");
					this.element.classList.add(Eb());
					c.viewProps.bindClassModifiers(this.element);
					const a = f.createElement("select");
					a.classList.add(Eb("s"));
					c.viewProps.bindDisabled(a);
					this.element.appendChild(a);
					this.selectElement = a;
					const d = f.createElement("div");
					d.classList.add(Eb("m"));
					d.appendChild(ia(f, "dropdown"));
					this.element.appendChild(d);
					c.value.emitter.on("change", this.onValueChange_);
					this.value_ = c.value;
					oa(this.props_, "options", b => {
						la(this.selectElement);
						b.forEach(b => {
							const a = f.createElement("option");
							a.textContent = b.text;
							this.selectElement.appendChild(a);
						});
						this.update_();
					});
				}
				update_() {
					const a = this.props_.get("options").map(a => a.value);
					this.selectElement.selectedIndex = a.indexOf(this.value_.rawValue);
				}
				onValueChange_() {
					this.update_();
				}
			}
			class Gb {
				constructor(b, c) {
					this.onSelectChange_ = this.onSelectChange_.bind(this);
					this.props = c.props;
					this.value = c.value;
					this.viewProps = c.viewProps;
					this.view = new Fb(b, {
						props: this.props,
						value: this.value,
						viewProps: this.viewProps
					});
					this.view.selectElement.addEventListener("change", this.onSelectChange_);
				}
				onSelectChange_(a) {
					const b = a.currentTarget;
					this.value.rawValue = this.props.get("options")[b.selectedIndex].value;
				}
				importProps(b) {
					return aa(b, null, b => ({
						options: b.required.custom(Bb)
					}), b => {
						this.props.set("options", Cb(b.options));
						return true;
					});
				}
				exportProps() {
					return ba(null, {
						options: this.props.get("options")
					});
				}
			}
			const Hb = qa("pop");
			class Ib {
				constructor(b, c) {
					this.element = b.createElement("div");
					this.element.classList.add(Hb());
					c.viewProps.bindClassModifiers(this.element);
					na(c.shows, Ga(this.element, Hb(undefined, "v")));
				}
			}
			class Jb {
				constructor(c, b) {
					this.shows = sh(false);
					this.viewProps = b.viewProps;
					this.view = new Ib(c, {
						shows: this.shows,
						viewProps: this.viewProps
					});
				}
			}
			const Kb = qa("txt");
			class Lb {
				constructor(c, d) {
					this.onChange_ = this.onChange_.bind(this);
					this.element = c.createElement("div");
					this.element.classList.add(Kb());
					d.viewProps.bindClassModifiers(this.element);
					this.props_ = d.props;
					this.props_.emitter.on("change", this.onChange_);
					const a = c.createElement("input");
					a.classList.add(Kb("i"));
					a.type = "text";
					d.viewProps.bindDisabled(a);
					this.element.appendChild(a);
					this.inputElement = a;
					d.value.emitter.on("change", this.onChange_);
					this.value_ = d.value;
					this.refresh();
				}
				refresh() {
					const b = this.props_.get("formatter");
					this.inputElement.value = b(this.value_.rawValue);
				}
				onChange_() {
					this.refresh();
				}
			}
			class Mb {
				constructor(c, a) {
					this.onInputChange_ = this.onInputChange_.bind(this);
					this.parser_ = a.parser;
					this.props = a.props;
					this.value = a.value;
					this.viewProps = a.viewProps;
					this.view = new Lb(c, {
						props: a.props,
						value: this.value,
						viewProps: this.viewProps
					});
					this.view.inputElement.addEventListener("change", this.onInputChange_);
				}
				onInputChange_(a) {
					const b = a.currentTarget.value;
					const c = this.parser_(b);
					if (!qh(c)) {
						this.value.rawValue = c;
					}
					this.view.refresh();
				}
			}
			function Nb(a) {
				return a !== "false" && !!a;
			}
			function Ob(b) {
				return function (b) {
					return String(b);
				}(b);
			}
			const Pb = D(0);
			function Qb(b) {
				return Pb(b) + "%";
			}
			function Rb(b) {
				return String(b);
			}
			function Sb(b) {
				return b;
			}
			function Tb({
				primary: d,
				secondary: c,
				forward: e,
				backward: b
			}) {
				let f = false;
				function g(a) {
					if (!f) {
						f = true;
						a();
						f = false;
					}
				}
				d.emitter.on("change", a => {
					g(() => {
						c.setRawValue(e(d.rawValue, c.rawValue), a.options);
					});
				});
				c.emitter.on("change", f => {
					g(() => {
						d.setRawValue(b(d.rawValue, c.rawValue), f.options);
					});
					g(() => {
						c.setRawValue(e(d.rawValue, c.rawValue), f.options);
					});
				});
				g(() => {
					c.setRawValue(e(d.rawValue, c.rawValue), {
						forceEmit: false,
						last: true
					});
				});
			}
			function Ub(b, c) {
				const a = b * (c.altKey ? 0.1 : 1) * (c.shiftKey ? 10 : 1);
				if (c.upKey) {
					return +a;
				} else if (c.downKey) {
					return -a;
				} else {
					return 0;
				}
			}
			function Vb(a) {
				return {
					altKey: a.altKey,
					downKey: a.key === "ArrowDown",
					shiftKey: a.shiftKey,
					upKey: a.key === "ArrowUp"
				};
			}
			function Wb(b) {
				return {
					altKey: b.altKey,
					downKey: b.key === "ArrowLeft",
					shiftKey: b.shiftKey,
					upKey: b.key === "ArrowRight"
				};
			}
			function Xb(b) {
				return function (b) {
					return b === "ArrowUp" || b === "ArrowDown";
				}(b) || b === "ArrowLeft" || b === "ArrowRight";
			}
			function Yb(c, d) {
				const a = d.ownerDocument.defaultView;
				const e = d.getBoundingClientRect();
				return {
					x: c.pageX - (((a && a.scrollX) ?? 0) + e.left),
					y: c.pageY - (((a && a.scrollY) ?? 0) + e.top)
				};
			}
			class Zb {
				constructor(b) {
					this.lastTouch_ = null;
					this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this);
					this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this);
					this.onMouseDown_ = this.onMouseDown_.bind(this);
					this.onTouchEnd_ = this.onTouchEnd_.bind(this);
					this.onTouchMove_ = this.onTouchMove_.bind(this);
					this.onTouchStart_ = this.onTouchStart_.bind(this);
					this.elem_ = b;
					this.emitter = new g();
					b.addEventListener("touchstart", this.onTouchStart_, {
						passive: false
					});
					b.addEventListener("touchmove", this.onTouchMove_, {
						passive: true
					});
					b.addEventListener("touchend", this.onTouchEnd_);
					b.addEventListener("mousedown", this.onMouseDown_);
				}
				computePosition_(c) {
					const a = this.elem_.getBoundingClientRect();
					return {
						bounds: {
							width: a.width,
							height: a.height
						},
						point: c ? {
							x: c.x,
							y: c.y
						} : null
					};
				}
				onMouseDown_(a) {
					var b;
					a.preventDefault();
					if ((b = a.currentTarget) !== null && b !== undefined) {
						b.focus();
					}
					const e = this.elem_.ownerDocument;
					e.addEventListener("mousemove", this.onDocumentMouseMove_);
					e.addEventListener("mouseup", this.onDocumentMouseUp_);
					this.emitter.emit("down", {
						altKey: a.altKey,
						data: this.computePosition_(Yb(a, this.elem_)),
						sender: this,
						shiftKey: a.shiftKey
					});
				}
				onDocumentMouseMove_(b) {
					this.emitter.emit("move", {
						altKey: b.altKey,
						data: this.computePosition_(Yb(b, this.elem_)),
						sender: this,
						shiftKey: b.shiftKey
					});
				}
				onDocumentMouseUp_(a) {
					const b = this.elem_.ownerDocument;
					b.removeEventListener("mousemove", this.onDocumentMouseMove_);
					b.removeEventListener("mouseup", this.onDocumentMouseUp_);
					this.emitter.emit("up", {
						altKey: a.altKey,
						data: this.computePosition_(Yb(a, this.elem_)),
						sender: this,
						shiftKey: a.shiftKey
					});
				}
				onTouchStart_(b) {
					b.preventDefault();
					const c = b.targetTouches.item(0);
					const d = this.elem_.getBoundingClientRect();
					this.emitter.emit("down", {
						altKey: b.altKey,
						data: this.computePosition_(c ? {
							x: c.clientX - d.left,
							y: c.clientY - d.top
						} : undefined),
						sender: this,
						shiftKey: b.shiftKey
					});
					this.lastTouch_ = c;
				}
				onTouchMove_(b) {
					const c = b.targetTouches.item(0);
					const d = this.elem_.getBoundingClientRect();
					this.emitter.emit("move", {
						altKey: b.altKey,
						data: this.computePosition_(c ? {
							x: c.clientX - d.left,
							y: c.clientY - d.top
						} : undefined),
						sender: this,
						shiftKey: b.shiftKey
					});
					this.lastTouch_ = c;
				}
				onTouchEnd_(c) {
					const a = c.targetTouches.item(0) ?? this.lastTouch_;
					const d = this.elem_.getBoundingClientRect();
					this.emitter.emit("up", {
						altKey: c.altKey,
						data: this.computePosition_(a ? {
							x: a.clientX - d.left,
							y: a.clientY - d.top
						} : undefined),
						sender: this,
						shiftKey: c.shiftKey
					});
				}
			}
			const $b = qa("txt");
			class _b {
				constructor(i, h) {
					this.onChange_ = this.onChange_.bind(this);
					this.props_ = h.props;
					this.props_.emitter.on("change", this.onChange_);
					this.element = i.createElement("div");
					this.element.classList.add($b(), $b(undefined, "num"));
					if (h.arrayPosition) {
						this.element.classList.add($b(undefined, h.arrayPosition));
					}
					h.viewProps.bindClassModifiers(this.element);
					const a = i.createElement("input");
					a.classList.add($b("i"));
					a.type = "text";
					h.viewProps.bindDisabled(a);
					this.element.appendChild(a);
					this.inputElement = a;
					this.onDraggingChange_ = this.onDraggingChange_.bind(this);
					this.dragging_ = h.dragging;
					this.dragging_.emitter.on("change", this.onDraggingChange_);
					this.element.classList.add($b());
					this.inputElement.classList.add($b("i"));
					const f = i.createElement("div");
					f.classList.add($b("k"));
					this.element.appendChild(f);
					this.knobElement = f;
					const b = i.createElementNS(ea, "svg");
					b.classList.add($b("g"));
					this.knobElement.appendChild(b);
					const c = i.createElementNS(ea, "path");
					c.classList.add($b("gb"));
					b.appendChild(c);
					this.guideBodyElem_ = c;
					const d = i.createElementNS(ea, "path");
					d.classList.add($b("gh"));
					b.appendChild(d);
					this.guideHeadElem_ = d;
					const e = i.createElement("div");
					e.classList.add(qa("tt")());
					this.knobElement.appendChild(e);
					this.tooltipElem_ = e;
					h.value.emitter.on("change", this.onChange_);
					this.value = h.value;
					this.refresh();
				}
				onDraggingChange_(f) {
					if (f.rawValue === null) {
						this.element.classList.remove($b(undefined, "drg"));
						return;
					}
					this.element.classList.add($b(undefined, "drg"));
					const a = f.rawValue / this.props_.get("pointerScale");
					const c = a + (a > 0 ? -1 : a < 0 ? 1 : 0);
					const b = G(-c, -4, 4);
					this.guideHeadElem_.setAttributeNS(null, "d", ["M " + (c + b) + ",0 L" + c + ",4 L" + (c + b) + ",8", "M " + a + ",-1 L" + a + ",9"].join(" "));
					this.guideBodyElem_.setAttributeNS(null, "d", "M 0,4 L" + a + ",4");
					const d = this.props_.get("formatter");
					this.tooltipElem_.textContent = d(this.value.rawValue);
					this.tooltipElem_.style.left = a + "px";
				}
				refresh() {
					const a = this.props_.get("formatter");
					this.inputElement.value = a(this.value.rawValue);
				}
				onChange_() {
					this.refresh();
				}
			}
			class ac {
				constructor(b, c) {
					this.originRawValue_ = 0;
					this.onInputChange_ = this.onInputChange_.bind(this);
					this.onInputKeyDown_ = this.onInputKeyDown_.bind(this);
					this.onInputKeyUp_ = this.onInputKeyUp_.bind(this);
					this.onPointerDown_ = this.onPointerDown_.bind(this);
					this.onPointerMove_ = this.onPointerMove_.bind(this);
					this.onPointerUp_ = this.onPointerUp_.bind(this);
					this.parser_ = c.parser;
					this.props = c.props;
					this.sliderProps_ = c.sliderProps ?? null;
					this.value = c.value;
					this.viewProps = c.viewProps;
					this.dragging_ = sh(null);
					this.view = new _b(b, {
						arrayPosition: c.arrayPosition,
						dragging: this.dragging_,
						props: this.props,
						value: this.value,
						viewProps: this.viewProps
					});
					this.view.inputElement.addEventListener("change", this.onInputChange_);
					this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_);
					this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
					const a = new Zb(this.view.knobElement);
					a.emitter.on("down", this.onPointerDown_);
					a.emitter.on("move", this.onPointerMove_);
					a.emitter.on("up", this.onPointerUp_);
				}
				constrainValue_(a) {
					var b;
					var e;
					const i = (b = this.sliderProps_) === null || b === undefined ? undefined : b.get("min");
					const f = (e = this.sliderProps_) === null || e === undefined ? undefined : e.get("max");
					let g = a;
					if (i !== undefined) {
						g = Math.max(g, i);
					}
					if (f !== undefined) {
						g = Math.min(g, f);
					}
					return g;
				}
				onInputChange_(b) {
					const a = b.currentTarget.value;
					const c = this.parser_(a);
					if (!qh(c)) {
						this.value.rawValue = this.constrainValue_(c);
					}
					this.view.refresh();
				}
				onInputKeyDown_(a) {
					const b = Ub(this.props.get("keyScale"), Vb(a));
					if (b !== 0) {
						this.value.setRawValue(this.constrainValue_(this.value.rawValue + b), {
							forceEmit: false,
							last: false
						});
					}
				}
				onInputKeyUp_(b) {
					if (Ub(this.props.get("keyScale"), Vb(b)) !== 0) {
						this.value.setRawValue(this.value.rawValue, {
							forceEmit: true,
							last: true
						});
					}
				}
				onPointerDown_() {
					this.originRawValue_ = this.value.rawValue;
					this.dragging_.rawValue = 0;
				}
				computeDraggingValue_(b) {
					if (!b.point) {
						return null;
					}
					const a = b.point.x - b.bounds.width / 2;
					return this.constrainValue_(this.originRawValue_ + a * this.props.get("pointerScale"));
				}
				onPointerMove_(a) {
					const b = this.computeDraggingValue_(a.data);
					if (b !== null) {
						this.value.setRawValue(b, {
							forceEmit: false,
							last: false
						});
						this.dragging_.rawValue = this.value.rawValue - this.originRawValue_;
					}
				}
				onPointerUp_(c) {
					const a = this.computeDraggingValue_(c.data);
					if (a !== null) {
						this.value.setRawValue(a, {
							forceEmit: true,
							last: true
						});
						this.dragging_.rawValue = null;
					}
				}
			}
			const bc = qa("sld");
			class cc {
				constructor(c, d) {
					this.onChange_ = this.onChange_.bind(this);
					this.props_ = d.props;
					this.props_.emitter.on("change", this.onChange_);
					this.element = c.createElement("div");
					this.element.classList.add(bc());
					d.viewProps.bindClassModifiers(this.element);
					const a = c.createElement("div");
					a.classList.add(bc("t"));
					d.viewProps.bindTabIndex(a);
					this.element.appendChild(a);
					this.trackElement = a;
					const e = c.createElement("div");
					e.classList.add(bc("k"));
					this.trackElement.appendChild(e);
					this.knobElement = e;
					d.value.emitter.on("change", this.onChange_);
					this.value = d.value;
					this.update_();
				}
				update_() {
					const a = G(E(this.value.rawValue, this.props_.get("min"), this.props_.get("max"), 0, 100), 0, 100);
					this.knobElement.style.width = a + "%";
				}
				onChange_() {
					this.update_();
				}
			}
			class dc {
				constructor(b, c) {
					this.onKeyDown_ = this.onKeyDown_.bind(this);
					this.onKeyUp_ = this.onKeyUp_.bind(this);
					this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this);
					this.onPointerUp_ = this.onPointerUp_.bind(this);
					this.value = c.value;
					this.viewProps = c.viewProps;
					this.props = c.props;
					this.view = new cc(b, {
						props: this.props,
						value: this.value,
						viewProps: this.viewProps
					});
					this.ptHandler_ = new Zb(this.view.trackElement);
					this.ptHandler_.emitter.on("down", this.onPointerDownOrMove_);
					this.ptHandler_.emitter.on("move", this.onPointerDownOrMove_);
					this.ptHandler_.emitter.on("up", this.onPointerUp_);
					this.view.trackElement.addEventListener("keydown", this.onKeyDown_);
					this.view.trackElement.addEventListener("keyup", this.onKeyUp_);
				}
				handlePointerEvent_(c, b) {
					if (c.point) {
						this.value.setRawValue(E(G(c.point.x, 0, c.bounds.width), 0, c.bounds.width, this.props.get("min"), this.props.get("max")), b);
					}
				}
				onPointerDownOrMove_(b) {
					this.handlePointerEvent_(b.data, {
						forceEmit: false,
						last: false
					});
				}
				onPointerUp_(a) {
					this.handlePointerEvent_(a.data, {
						forceEmit: true,
						last: true
					});
				}
				onKeyDown_(c) {
					const a = Ub(this.props.get("keyScale"), Wb(c));
					if (a !== 0) {
						this.value.setRawValue(this.value.rawValue + a, {
							forceEmit: false,
							last: false
						});
					}
				}
				onKeyUp_(b) {
					if (Ub(this.props.get("keyScale"), Wb(b)) !== 0) {
						this.value.setRawValue(this.value.rawValue, {
							forceEmit: true,
							last: true
						});
					}
				}
			}
			const ec = qa("sldtxt");
			class fc {
				constructor(c, e) {
					this.element = c.createElement("div");
					this.element.classList.add(ec());
					const a = c.createElement("div");
					a.classList.add(ec("s"));
					this.sliderView_ = e.sliderView;
					a.appendChild(this.sliderView_.element);
					this.element.appendChild(a);
					const d = c.createElement("div");
					d.classList.add(ec("t"));
					this.textView_ = e.textView;
					d.appendChild(this.textView_.element);
					this.element.appendChild(d);
				}
			}
			class gc {
				constructor(c, b) {
					this.value = b.value;
					this.viewProps = b.viewProps;
					this.sliderC_ = new dc(c, {
						props: b.sliderProps,
						value: b.value,
						viewProps: this.viewProps
					});
					this.textC_ = new ac(c, {
						parser: b.parser,
						props: b.textProps,
						sliderProps: b.sliderProps,
						value: b.value,
						viewProps: b.viewProps
					});
					this.view = new fc(c, {
						sliderView: this.sliderC_.view,
						textView: this.textC_.view
					});
				}
				get sliderController() {
					return this.sliderC_;
				}
				get textController() {
					return this.textC_;
				}
				importProps(b) {
					return aa(b, null, b => ({
						max: b.required.number,
						min: b.required.number
					}), b => {
						const a = this.sliderC_.props;
						a.set("max", b.max);
						a.set("min", b.min);
						return true;
					});
				}
				exportProps() {
					const a = this.sliderC_.props;
					return ba(null, {
						max: a.get("max"),
						min: a.get("min")
					});
				}
			}
			function hc(b) {
				return {
					sliderProps: new th({
						keyScale: b.keyScale,
						max: b.max,
						min: b.min
					}),
					textProps: new th({
						formatter: sh(b.formatter),
						keyScale: b.keyScale,
						pointerScale: sh(b.pointerScale)
					})
				};
			}
			const ic = {
				containerUnitSize: "cnt-usz"
			};
			function jc(b) {
				return "--" + ic[b];
			}
			function kc(b) {
				return O(b);
			}
			function lc(b) {
				if (Ke(b)) {
					return _(b, kc);
				}
			}
			function mc(d, e) {
				if (!d) {
					return;
				}
				const a = [];
				const f = L(d, e);
				if (f) {
					a.push(f);
				}
				const b = M(d);
				if (b) {
					a.push(b);
				}
				return new yb(a);
			}
			function oc(a) {
				if (a === "inline" || a === "popup") {
					return a;
				}
			}
			function pc(c, a) {
				c.write(a);
			}
			const qc = qa("ckb");
			class rc {
				constructor(g, f) {
					this.onValueChange_ = this.onValueChange_.bind(this);
					this.element = g.createElement("div");
					this.element.classList.add(qc());
					f.viewProps.bindClassModifiers(this.element);
					const a = g.createElement("label");
					a.classList.add(qc("l"));
					this.element.appendChild(a);
					this.labelElement = a;
					const d = g.createElement("input");
					d.classList.add(qc("i"));
					d.type = "checkbox";
					this.labelElement.appendChild(d);
					this.inputElement = d;
					f.viewProps.bindDisabled(this.inputElement);
					const b = g.createElement("div");
					b.classList.add(qc("w"));
					this.labelElement.appendChild(b);
					const c = ia(g, "check");
					b.appendChild(c);
					f.value.emitter.on("change", this.onValueChange_);
					this.value = f.value;
					this.update_();
				}
				update_() {
					this.inputElement.checked = this.value.rawValue;
				}
				onValueChange_() {
					this.update_();
				}
			}
			class sc {
				constructor(b, c) {
					this.onInputChange_ = this.onInputChange_.bind(this);
					this.onLabelMouseDown_ = this.onLabelMouseDown_.bind(this);
					this.value = c.value;
					this.viewProps = c.viewProps;
					this.view = new rc(b, {
						value: this.value,
						viewProps: this.viewProps
					});
					this.view.inputElement.addEventListener("change", this.onInputChange_);
					this.view.labelElement.addEventListener("mousedown", this.onLabelMouseDown_);
				}
				onInputChange_(b) {
					const a = b.currentTarget;
					this.value.rawValue = a.checked;
					b.preventDefault();
					b.stopPropagation();
				}
				onLabelMouseDown_(a) {
					a.preventDefault();
				}
			}
			const tc = Oa({
				id: "input-bool",
				type: "input",
				accept: (a, b) => {
					if (typeof a != "boolean") {
						return null;
					}
					const c = _(b, a => ({
						options: a.optional.custom(Bb),
						readonly: a.optional.constant(false)
					}));
					if (c) {
						return {
							initialValue: a,
							params: c
						};
					} else {
						return null;
					}
				},
				binding: {
					reader: b => Nb,
					constraint: b => function (b) {
						const a = [];
						const c = Db(b.options);
						if (c) {
							a.push(c);
						}
						return new yb(a);
					}(b.params),
					writer: b => pc
				},
				controller: d => {
					const e = d.document;
					const f = d.value;
					const a = d.constraint;
					const b = a && zb(a, Ab);
					if (b) {
						return new Gb(e, {
							props: new th({
								options: b.values.value("options")
							}),
							value: f,
							viewProps: d.viewProps
						});
					} else {
						return new sc(e, {
							value: f,
							viewProps: d.viewProps
						});
					}
				},
				api: b => typeof b.controller.value.rawValue != "boolean" ? null : b.controller.valueController instanceof Gb ? new vb(b.controller) : null
			});
			const uc = qa("col");
			class vc {
				constructor(g, b) {
					this.element = g.createElement("div");
					this.element.classList.add(uc());
					b.foldable.bindExpandedClass(this.element, uc(undefined, "expanded"));
					oa(b.foldable, "completed", Ga(this.element, uc(undefined, "cpl")));
					const d = g.createElement("div");
					d.classList.add(uc("h"));
					this.element.appendChild(d);
					const e = g.createElement("div");
					e.classList.add(uc("s"));
					d.appendChild(e);
					this.swatchElement = e;
					const c = g.createElement("div");
					c.classList.add(uc("t"));
					d.appendChild(c);
					this.textElement = c;
					if (b.pickerLayout === "inline") {
						const a = g.createElement("div");
						a.classList.add(uc("p"));
						this.element.appendChild(a);
						this.pickerElement = a;
					} else {
						this.pickerElement = null;
					}
				}
			}
			function wc(h, a, i) {
				const j = H(h, 360);
				const k = G(a / 100, 0, 1);
				const b = G(i / 100, 0, 1);
				const c = b * k;
				const d = c * (1 - Math.abs(j / 60 % 2 - 1));
				const e = b - c;
				let f;
				let n;
				let o;
				[f, n, o] = j >= 0 && j < 60 ? [c, d, 0] : j >= 60 && j < 120 ? [d, c, 0] : j >= 120 && j < 180 ? [0, c, d] : j >= 180 && j < 240 ? [0, d, c] : j >= 240 && j < 300 ? [d, 0, c] : [c, 0, d];
				return [(f + e) * 255, (n + e) * 255, (o + e) * 255];
			}
			function xc(b) {
				return [b[0], b[1], b[2]];
			}
			function yc(b, c) {
				return [b[0], b[1], b[2], c];
			}
			const zc = {
				hsl: {
					hsl: (d, a, b) => [d, a, b],
					hsv: function (b, a, c) {
						const d = c + a * (100 - Math.abs(c * 2 - 100)) / 200;
						return [b, d !== 0 ? a * (100 - Math.abs(c * 2 - 100)) / d : 0, c + a * (100 - Math.abs(c * 2 - 100)) / 200];
					},
					rgb: function (h, a, i) {
						const j = (h % 360 + 360) % 360;
						const k = G(a / 100, 0, 1);
						const b = G(i / 100, 0, 1);
						const c = (1 - Math.abs(b * 2 - 1)) * k;
						const d = c * (1 - Math.abs(j / 60 % 2 - 1));
						const e = b - c / 2;
						let f;
						let n;
						let o;
						[f, n, o] = j >= 0 && j < 60 ? [c, d, 0] : j >= 60 && j < 120 ? [d, c, 0] : j >= 120 && j < 180 ? [0, c, d] : j >= 180 && j < 240 ? [0, d, c] : j >= 240 && j < 300 ? [d, 0, c] : [c, 0, d];
						return [(f + e) * 255, (n + e) * 255, (o + e) * 255];
					}
				},
				hsv: {
					hsl: function (a, b, d) {
						const c = 100 - Math.abs(d * (200 - b) / 100 - 100);
						return [a, c !== 0 ? b * d / c : 0, d * (200 - b) / 200];
					},
					hsv: (d, a, b) => [d, a, b],
					rgb: wc
				},
				rgb: {
					hsl: function (h, i, b) {
						const j = G(h / 255, 0, 1);
						const k = G(i / 255, 0, 1);
						const a = G(b / 255, 0, 1);
						const c = Math.max(j, k, a);
						const d = Math.min(j, k, a);
						const e = c - d;
						let f = 0;
						let l = 0;
						const m = (d + c) / 2;
						if (e !== 0) {
							l = e / (1 - Math.abs(c + d - 1));
							f = j === c ? (k - a) / e : k === c ? 2 + (a - j) / e : 4 + (j - k) / e;
							f = f / 6 + (f < 0 ? 1 : 0);
						}
						return [f * 360, l * 100, m * 100];
					},
					hsv: function (h, a, b) {
						const i = G(h / 255, 0, 1);
						const j = G(a / 255, 0, 1);
						const c = G(b / 255, 0, 1);
						const d = Math.max(i, j, c);
						const e = d - Math.min(i, j, c);
						let f;
						f = e === 0 ? 0 : d === i ? ((j - c) / e % 6 + 6) % 6 * 60 : d === j ? ((c - i) / e + 2) * 60 : ((i - j) / e + 4) * 60;
						return [f, (d === 0 ? 0 : e / d) * 100, d * 100];
					},
					rgb: (d, a, b) => [d, a, b]
				}
			};
			function Ac(c, b) {
				return [b === "float" ? 1 : c === "rgb" ? 255 : 360, b === "float" ? 1 : c === "rgb" ? 255 : 100, b === "float" ? 1 : c === "rgb" ? 255 : 100];
			}
			function Bc(c, a, d) {
				const e = Ac(a, d);
				return [a === "rgb" ? G(c[0], 0, e[0]) : (f = c[0], h = e[0], f === h ? h : H(f, h)), G(c[1], 0, e[1]), G(c[2], 0, e[2]), G(c[3] ?? 1, 0, 1)];
				var f;
				var h;
			}
			function Cc(a, b, c, d) {
				const e = Ac(b, c);
				const f = Ac(b, d);
				return a.map((b, c) => b / e[c] * f[c]);
			}
			function Dc(c, a, b) {
				const d = Cc(c, a.mode, a.type, "int");
				return Cc(zc[a.mode][b.mode](...d), b.mode, "int", b.type);
			}
			class Ec {
				static black() {
					return new Ec([0, 0, 0], "rgb");
				}
				constructor(c, a) {
					this.type = "int";
					this.mode = a;
					this.comps_ = Bc(c, a, this.type);
				}
				getComponents(b) {
					return yc(Dc(xc(this.comps_), {
						mode: this.mode,
						type: this.type
					}, {
						mode: b ?? this.mode,
						type: this.type
					}), this.comps_[3]);
				}
				toRgbaObject() {
					const b = this.getComponents("rgb");
					return {
						r: b[0],
						g: b[1],
						b: b[2],
						a: b[3]
					};
				}
			}
			const Fc = qa("colp");
			class Gc {
				constructor(h, f) {
					this.alphaViews_ = null;
					this.element = h.createElement("div");
					this.element.classList.add(Fc());
					f.viewProps.bindClassModifiers(this.element);
					const a = h.createElement("div");
					a.classList.add(Fc("hsv"));
					const e = h.createElement("div");
					e.classList.add(Fc("sv"));
					this.svPaletteView_ = f.svPaletteView;
					e.appendChild(this.svPaletteView_.element);
					a.appendChild(e);
					const b = h.createElement("div");
					b.classList.add(Fc("h"));
					this.hPaletteView_ = f.hPaletteView;
					b.appendChild(this.hPaletteView_.element);
					a.appendChild(b);
					this.element.appendChild(a);
					const c = h.createElement("div");
					c.classList.add(Fc("rgb"));
					this.textsView_ = f.textsView;
					c.appendChild(this.textsView_.element);
					this.element.appendChild(c);
					if (f.alphaViews) {
						this.alphaViews_ = {
							palette: f.alphaViews.palette,
							text: f.alphaViews.text
						};
						const a = h.createElement("div");
						a.classList.add(Fc("a"));
						const d = h.createElement("div");
						d.classList.add(Fc("ap"));
						d.appendChild(this.alphaViews_.palette.element);
						a.appendChild(d);
						const b = h.createElement("div");
						b.classList.add(Fc("at"));
						b.appendChild(this.alphaViews_.text.element);
						a.appendChild(b);
						this.element.appendChild(a);
					}
				}
				get allFocusableElements() {
					const a = [this.svPaletteView_.element, this.hPaletteView_.element, this.textsView_.modeSelectElement, ...this.textsView_.inputViews.map(b => b.inputElement)];
					if (this.alphaViews_) {
						a.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement);
					}
					return a;
				}
			}
			function Hc(b) {
				if (b === "int") {
					return "int";
				} else if (b === "float") {
					return "float";
				} else {
					return undefined;
				}
			}
			function Ic(b) {
				return _(b, b => ({
					color: b.optional.object({
						alpha: b.optional.boolean,
						type: b.optional.custom(Hc)
					}),
					expanded: b.optional.boolean,
					picker: b.optional.custom(oc),
					readonly: b.optional.constant(false)
				}));
			}
			function Jc(b) {
				if (b) {
					return 0.1;
				} else {
					return 1;
				}
			}
			function Kc(a) {
				return a.color?.type;
			}
			class Lc {
				constructor(c, a) {
					this.type = "float";
					this.mode = a;
					this.comps_ = Bc(c, a, this.type);
				}
				getComponents(a) {
					return yc(Dc(xc(this.comps_), {
						mode: this.mode,
						type: this.type
					}, {
						mode: a ?? this.mode,
						type: this.type
					}), this.comps_[3]);
				}
				toRgbaObject() {
					const b = this.getComponents("rgb");
					return {
						r: b[0],
						g: b[1],
						b: b[2],
						a: b[3]
					};
				}
			}
			const Mc = {
				int: (b, c) => new Ec(b, c),
				float: (b, c) => new Lc(b, c)
			};
			function Nc(d, a, b) {
				return Mc[b](d, a);
			}
			function Oc(b, c) {
				if (b.type === c) {
					return b;
				}
				if (function (a) {
					return a.type === "int";
				}(b) && c === "float") {
					return function (b) {
						const d = b.getComponents();
						const c = Ac(b.mode, "int");
						return new Lc([E(d[0], 0, c[0], 0, 1), E(d[1], 0, c[1], 0, 1), E(d[2], 0, c[2], 0, 1), d[3]], b.mode);
					}(b);
				}
				if (function (a) {
					return a.type === "float";
				}(b) && c === "int") {
					return function (b) {
						const d = b.getComponents();
						const c = Ac(b.mode, "int");
						return new Ec([Math.round(E(d[0], 0, 1, 0, c[0])), Math.round(E(d[1], 0, 1, 0, c[1])), Math.round(E(d[2], 0, 1, 0, c[2])), d[3]], b.mode);
					}(b);
				}
				throw hh.shouldNeverHappen();
			}
			function Pc(a, b) {
				const c = a.match(/^(.+)%$/);
				if (c) {
					return Math.min(parseFloat(c[1]) * 0.01 * b, b);
				} else {
					return Math.min(parseFloat(a), b);
				}
			}
			const Qc = {
				deg: b => b,
				grad: b => b * 360 / 400,
				rad: b => b * 360 / (Math.PI * 2),
				turn: b => b * 360
			};
			function Rc(b) {
				const c = b.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
				if (!c) {
					return parseFloat(b);
				}
				const d = parseFloat(c[1]);
				const e = c[2];
				return Qc[e](d);
			}
			function Sc(a) {
				const b = a.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
				if (!b) {
					return null;
				}
				const c = [Pc(b[1], 255), Pc(b[2], 255), Pc(b[3], 255)];
				if (isNaN(c[0]) || isNaN(c[1]) || isNaN(c[2])) {
					return null;
				} else {
					return c;
				}
			}
			function Tc(c) {
				const a = Sc(c);
				if (a) {
					return new Ec(a, "rgb");
				} else {
					return null;
				}
			}
			function Uc(a) {
				const b = a.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
				if (!b) {
					return null;
				}
				const c = [Pc(b[1], 255), Pc(b[2], 255), Pc(b[3], 255), Pc(b[4], 1)];
				if (isNaN(c[0]) || isNaN(c[1]) || isNaN(c[2]) || isNaN(c[3])) {
					return null;
				} else {
					return c;
				}
			}
			function Vc(c) {
				const a = Uc(c);
				if (a) {
					return new Ec(a, "rgb");
				} else {
					return null;
				}
			}
			function Wc(a) {
				const b = a.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
				if (!b) {
					return null;
				}
				const c = [Rc(b[1]), Pc(b[2], 100), Pc(b[3], 100)];
				if (isNaN(c[0]) || isNaN(c[1]) || isNaN(c[2])) {
					return null;
				} else {
					return c;
				}
			}
			function Xc(c) {
				const a = Wc(c);
				if (a) {
					return new Ec(a, "hsl");
				} else {
					return null;
				}
			}
			function Yc(a) {
				const b = a.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
				if (!b) {
					return null;
				}
				const c = [Rc(b[1]), Pc(b[2], 100), Pc(b[3], 100), Pc(b[4], 1)];
				if (isNaN(c[0]) || isNaN(c[1]) || isNaN(c[2]) || isNaN(c[3])) {
					return null;
				} else {
					return c;
				}
			}
			function Zc(c) {
				const a = Yc(c);
				if (a) {
					return new Ec(a, "hsl");
				} else {
					return null;
				}
			}
			function $c(a) {
				const b = a.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
				if (b) {
					return [parseInt(b[1] + b[1], 16), parseInt(b[2] + b[2], 16), parseInt(b[3] + b[3], 16)];
				}
				const c = a.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
				if (c) {
					return [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16)];
				} else {
					return null;
				}
			}
			function _c(c) {
				const a = $c(c);
				if (a) {
					return new Ec(a, "rgb");
				} else {
					return null;
				}
			}
			function ad(a) {
				const b = a.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
				if (b) {
					return [parseInt(b[1] + b[1], 16), parseInt(b[2] + b[2], 16), parseInt(b[3] + b[3], 16), E(parseInt(b[4] + b[4], 16), 0, 255, 0, 1)];
				}
				const c = a.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
				if (c) {
					return [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16), E(parseInt(c[4], 16), 0, 255, 0, 1)];
				} else {
					return null;
				}
			}
			function bd(c) {
				const a = ad(c);
				if (a) {
					return new Ec(a, "rgb");
				} else {
					return null;
				}
			}
			function cd(a) {
				const b = a.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
				if (!b) {
					return null;
				}
				const c = [parseFloat(b[1]), parseFloat(b[2]), parseFloat(b[3])];
				if (isNaN(c[0]) || isNaN(c[1]) || isNaN(c[2])) {
					return null;
				} else {
					return c;
				}
			}
			function ed(b) {
				return a => {
					const d = cd(a);
					if (d) {
						return Nc(d, "rgb", b);
					} else {
						return null;
					}
				};
			}
			function fd(a) {
				const b = a.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
				if (!b) {
					return null;
				}
				const c = [parseFloat(b[1]), parseFloat(b[2]), parseFloat(b[3]), parseFloat(b[4])];
				if (isNaN(c[0]) || isNaN(c[1]) || isNaN(c[2]) || isNaN(c[3])) {
					return null;
				} else {
					return c;
				}
			}
			function gd(b) {
				return a => {
					const c = fd(a);
					if (c) {
						return Nc(c, "rgb", b);
					} else {
						return null;
					}
				};
			}
			const hd = [{
				parser: $c,
				result: {
					alpha: false,
					mode: "rgb",
					notation: "hex"
				}
			}, {
				parser: ad,
				result: {
					alpha: true,
					mode: "rgb",
					notation: "hex"
				}
			}, {
				parser: Sc,
				result: {
					alpha: false,
					mode: "rgb",
					notation: "func"
				}
			}, {
				parser: Uc,
				result: {
					alpha: true,
					mode: "rgb",
					notation: "func"
				}
			}, {
				parser: Wc,
				result: {
					alpha: false,
					mode: "hsl",
					notation: "func"
				}
			}, {
				parser: Yc,
				result: {
					alpha: true,
					mode: "hsl",
					notation: "func"
				}
			}, {
				parser: cd,
				result: {
					alpha: false,
					mode: "rgb",
					notation: "object"
				}
			}, {
				parser: fd,
				result: {
					alpha: true,
					mode: "rgb",
					notation: "object"
				}
			}];
			function id(d) {
				const a = [_c, bd, Tc, Vc, Xc, Zc];
				if (d === "int") {
					a.push(ed("int"), gd("int"));
				}
				if (d === "float") {
					a.push(ed("float"), gd("float"));
				}
				const e = function (a) {
					return b => a.reduce((c, d) => c !== null ? c : d(b), null);
				}(a);
				return a => {
					const b = e(a);
					if (b) {
						return Oc(b, d);
					} else {
						return null;
					}
				};
			}
			function jd(a) {
				const b = id("int");
				if (typeof a != "string") {
					return Ec.black();
				}
				const c = b(a);
				return c ?? Ec.black();
			}
			function kd(c) {
				const a = G(Math.floor(c), 0, 255).toString(16);
				if (a.length === 1) {
					return "0" + a;
				} else {
					return a;
				}
			}
			function ld(c, a = "#") {
				return "" + a + xc(c.getComponents("rgb")).map(kd).join("");
			}
			function md(b, c = "#") {
				const a = b.getComponents("rgb");
				return "" + c + [a[0], a[1], a[2], a[3] * 255].map(kd).join("");
			}
			function nd(b) {
				const d = D(0);
				return "rgb(" + xc(Oc(b, "int").getComponents("rgb")).map(b => d(b)).join(", ") + ")";
			}
			function od(b) {
				const d = D(2);
				const e = D(0);
				return "rgba(" + Oc(b, "int").getComponents("rgb").map((a, b) => (b === 3 ? d : e)(a)).join(", ") + ")";
			}
			function pd(b, c) {
				const d = D(c === "float" ? 2 : 0);
				const e = ["r", "g", "b"];
				return "{" + xc(Oc(b, c).getComponents("rgb")).map((a, b) => e[b] + ": " + d(a)).join(", ") + "}";
			}
			function qd(b) {
				return c => pd(c, b);
			}
			function rd(b, c) {
				const e = D(2);
				const f = D(c === "float" ? 2 : 0);
				const g = ["r", "g", "b", "a"];
				return "{" + Oc(b, c).getComponents("rgb").map((b, c) => g[c] + ": " + (c === 3 ? e : f)(b)).join(", ") + "}";
			}
			function sd(b) {
				return c => rd(c, b);
			}
			const td = [{
				format: {
					alpha: false,
					mode: "rgb",
					notation: "hex",
					type: "int"
				},
				stringifier: ld
			}, {
				format: {
					alpha: true,
					mode: "rgb",
					notation: "hex",
					type: "int"
				},
				stringifier: md
			}, {
				format: {
					alpha: false,
					mode: "rgb",
					notation: "func",
					type: "int"
				},
				stringifier: nd
			}, {
				format: {
					alpha: true,
					mode: "rgb",
					notation: "func",
					type: "int"
				},
				stringifier: od
			}, {
				format: {
					alpha: false,
					mode: "hsl",
					notation: "func",
					type: "int"
				},
				stringifier: function (b) {
					const e = [D(0), Qb, Qb];
					return "hsl(" + xc(Oc(b, "int").getComponents("hsl")).map((b, c) => e[c](b)).join(", ") + ")";
				}
			}, {
				format: {
					alpha: true,
					mode: "hsl",
					notation: "func",
					type: "int"
				},
				stringifier: function (a) {
					const c = [D(0), Qb, Qb, D(2)];
					return "hsla(" + Oc(a, "int").getComponents("hsl").map((d, a) => c[a](d)).join(", ") + ")";
				}
			}, ...["int", "float"].reduce((b, c) => [...b, {
				format: {
					alpha: false,
					mode: "rgb",
					notation: "object",
					type: c
				},
				stringifier: qd(c)
			}, {
				format: {
					alpha: true,
					mode: "rgb",
					notation: "object",
					type: c
				},
				stringifier: sd(c)
			}], [])];
			function ud(c) {
				return td.reduce((a, d) => {
					return a || (e = d.format, g = c, e.alpha === g.alpha && e.mode === g.mode && e.notation === g.notation && e.type === g.type ? d.stringifier : null);
					var e;
					var g;
				}, null);
			}
			const vd = qa("apl");
			class wd {
				constructor(f, g) {
					this.onValueChange_ = this.onValueChange_.bind(this);
					this.value = g.value;
					this.value.emitter.on("change", this.onValueChange_);
					this.element = f.createElement("div");
					this.element.classList.add(vd());
					g.viewProps.bindClassModifiers(this.element);
					g.viewProps.bindTabIndex(this.element);
					const a = f.createElement("div");
					a.classList.add(vd("b"));
					this.element.appendChild(a);
					const e = f.createElement("div");
					e.classList.add(vd("c"));
					a.appendChild(e);
					this.colorElem_ = e;
					const b = f.createElement("div");
					b.classList.add(vd("m"));
					this.element.appendChild(b);
					this.markerElem_ = b;
					const c = f.createElement("div");
					c.classList.add(vd("p"));
					this.markerElem_.appendChild(c);
					this.previewElem_ = c;
					this.update_();
				}
				update_() {
					const f = this.value.rawValue;
					const g = f.getComponents("rgb");
					const a = new Ec([g[0], g[1], g[2], 0], "rgb");
					const b = new Ec([g[0], g[1], g[2], 255], "rgb");
					const c = ["to right", od(a), od(b)];
					this.colorElem_.style.background = "linear-gradient(" + c.join(",") + ")";
					this.previewElem_.style.backgroundColor = od(f);
					const d = E(g[3], 0, 1, 0, 100);
					this.markerElem_.style.left = d + "%";
				}
				onValueChange_() {
					this.update_();
				}
			}
			class xd {
				constructor(b, c) {
					this.onKeyDown_ = this.onKeyDown_.bind(this);
					this.onKeyUp_ = this.onKeyUp_.bind(this);
					this.onPointerDown_ = this.onPointerDown_.bind(this);
					this.onPointerMove_ = this.onPointerMove_.bind(this);
					this.onPointerUp_ = this.onPointerUp_.bind(this);
					this.value = c.value;
					this.viewProps = c.viewProps;
					this.view = new wd(b, {
						value: this.value,
						viewProps: this.viewProps
					});
					this.ptHandler_ = new Zb(this.view.element);
					this.ptHandler_.emitter.on("down", this.onPointerDown_);
					this.ptHandler_.emitter.on("move", this.onPointerMove_);
					this.ptHandler_.emitter.on("up", this.onPointerUp_);
					this.view.element.addEventListener("keydown", this.onKeyDown_);
					this.view.element.addEventListener("keyup", this.onKeyUp_);
				}
				handlePointerEvent_(g, h) {
					if (!g.point) {
						return;
					}
					const a = g.point.x / g.bounds.width;
					const b = this.value.rawValue;
					const [c, d, e] = b.getComponents("hsv");
					this.value.setRawValue(new Ec([c, d, e, a], "hsv"), h);
				}
				onPointerDown_(a) {
					this.handlePointerEvent_(a.data, {
						forceEmit: false,
						last: false
					});
				}
				onPointerMove_(a) {
					this.handlePointerEvent_(a.data, {
						forceEmit: false,
						last: false
					});
				}
				onPointerUp_(b) {
					this.handlePointerEvent_(b.data, {
						forceEmit: true,
						last: true
					});
				}
				onKeyDown_(e) {
					const f = Ub(Jc(true), Wb(e));
					if (f === 0) {
						return;
					}
					const g = this.value.rawValue;
					const [h, a, b, c] = g.getComponents("hsv");
					this.value.setRawValue(new Ec([h, a, b, c + f], "hsv"), {
						forceEmit: false,
						last: false
					});
				}
				onKeyUp_(b) {
					if (Ub(Jc(true), Wb(b)) !== 0) {
						this.value.setRawValue(this.value.rawValue, {
							forceEmit: true,
							last: true
						});
					}
				}
			}
			const yd = qa("coltxt");
			class zd {
				constructor(b, d) {
					this.element = b.createElement("div");
					this.element.classList.add(yd());
					d.viewProps.bindClassModifiers(this.element);
					const a = b.createElement("div");
					a.classList.add(yd("m"));
					this.modeElem_ = function (f) {
						const a = f.createElement("select");
						a.appendChild([{
							text: "RGB",
							value: "rgb"
						}, {
							text: "HSL",
							value: "hsl"
						}, {
							text: "HSV",
							value: "hsv"
						}, {
							text: "HEX",
							value: "hex"
						}].reduce((b, a) => {
							const c = f.createElement("option");
							c.textContent = a.text;
							c.value = a.value;
							b.appendChild(c);
							return b;
						}, f.createDocumentFragment()));
						return a;
					}(b);
					this.modeElem_.classList.add(yd("ms"));
					a.appendChild(this.modeSelectElement);
					d.viewProps.bindDisabled(this.modeElem_);
					const e = b.createElement("div");
					e.classList.add(yd("mm"));
					e.appendChild(ia(b, "dropdown"));
					a.appendChild(e);
					this.element.appendChild(a);
					const f = b.createElement("div");
					f.classList.add(yd("w"));
					this.element.appendChild(f);
					this.inputsElem_ = f;
					this.inputViews_ = d.inputViews;
					this.applyInputViews_();
					na(d.mode, a => {
						this.modeElem_.value = a;
					});
				}
				get modeSelectElement() {
					return this.modeElem_;
				}
				get inputViews() {
					return this.inputViews_;
				}
				set inputViews(a) {
					this.inputViews_ = a;
					this.applyInputViews_();
				}
				applyInputViews_() {
					la(this.inputsElem_);
					const d = this.element.ownerDocument;
					this.inputViews_.forEach(b => {
						const c = d.createElement("div");
						c.classList.add(yd("c"));
						c.appendChild(b.element);
						this.inputsElem_.appendChild(c);
					});
				}
			}
			function Ad(a, b, c) {
				const d = Ac(a, b)[c];
				return new i({
					min: 0,
					max: d
				});
			}
			class Bd {
				constructor(b, c) {
					this.onModeSelectChange_ = this.onModeSelectChange_.bind(this);
					this.colorType_ = c.colorType;
					this.value = c.value;
					this.viewProps = c.viewProps;
					this.colorMode = sh(this.value.rawValue.mode);
					this.ccs_ = this.createComponentControllers_(b);
					this.view = new zd(b, {
						mode: this.colorMode,
						inputViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view],
						viewProps: this.viewProps
					});
					this.view.modeSelectElement.addEventListener("change", this.onModeSelectChange_);
				}
				createComponentControllers_(c) {
					const b = this.colorMode.rawValue;
					if (function (a) {
						return a !== "hex";
					}(b)) {
						return function (b, d) {
							const e = {
								colorMode: d.colorMode,
								colorType: d.colorType,
								parser: z,
								viewProps: d.viewProps
							};
							return [0, 1, 2].map(h => {
								const c = function (d, a, b) {
									return new ac(d, {
										arrayPosition: b === 0 ? "fst" : b === 2 ? "lst" : "mid",
										parser: a.parser,
										props: th.fromObject({
											formatter: (e = a.colorType, D(e === "float" ? 2 : 0)),
											keyScale: Jc(false),
											pointerScale: a.colorType === "float" ? 0.01 : 1
										}),
										value: sh(0, {
											constraint: Ad(a.colorMode, a.colorType, b)
										}),
										viewProps: a.viewProps
									});
									var e;
								}(b, e, h);
								Tb({
									primary: d.value,
									secondary: c.value,
									forward: b => Oc(b, d.colorType).getComponents(d.colorMode)[h],
									backward(e, b) {
										const a = d.colorMode;
										const f = Oc(e, d.colorType).getComponents(a);
										f[h] = b;
										return Oc(Nc(yc(xc(f), f[3]), a, d.colorType), "int");
									}
								});
								return c;
							});
						}(c, {
							colorMode: b,
							colorType: this.colorType_,
							value: this.value,
							viewProps: this.viewProps
						});
					} else {
						return function (d, b) {
							const a = new Mb(d, {
								parser: id("int"),
								props: th.fromObject({
									formatter: ld
								}),
								value: sh(Ec.black()),
								viewProps: b.viewProps
							});
							Tb({
								primary: b.value,
								secondary: a.value,
								forward: b => new Ec(xc(b.getComponents()), b.mode),
								backward: (b, c) => new Ec(yc(xc(c.getComponents(b.mode)), b.getComponents()[3]), b.mode)
							});
							return [a];
						}(c, {
							value: this.value,
							viewProps: this.viewProps
						});
					}
				}
				onModeSelectChange_(a) {
					const b = a.currentTarget;
					this.colorMode.rawValue = b.value;
					this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument);
					this.view.inputViews = this.ccs_.map(b => b.view);
				}
			}
			const Cd = qa("hpl");
			class Dd {
				constructor(c, d) {
					this.onValueChange_ = this.onValueChange_.bind(this);
					this.value = d.value;
					this.value.emitter.on("change", this.onValueChange_);
					this.element = c.createElement("div");
					this.element.classList.add(Cd());
					d.viewProps.bindClassModifiers(this.element);
					d.viewProps.bindTabIndex(this.element);
					const a = c.createElement("div");
					a.classList.add(Cd("c"));
					this.element.appendChild(a);
					const e = c.createElement("div");
					e.classList.add(Cd("m"));
					this.element.appendChild(e);
					this.markerElem_ = e;
					this.update_();
				}
				update_() {
					const b = this.value.rawValue;
					const [c] = b.getComponents("hsv");
					this.markerElem_.style.backgroundColor = nd(new Ec([c, 100, 100], "hsv"));
					const d = E(c, 0, 360, 0, 100);
					this.markerElem_.style.left = d + "%";
				}
				onValueChange_() {
					this.update_();
				}
			}
			class Ed {
				constructor(b, c) {
					this.onKeyDown_ = this.onKeyDown_.bind(this);
					this.onKeyUp_ = this.onKeyUp_.bind(this);
					this.onPointerDown_ = this.onPointerDown_.bind(this);
					this.onPointerMove_ = this.onPointerMove_.bind(this);
					this.onPointerUp_ = this.onPointerUp_.bind(this);
					this.value = c.value;
					this.viewProps = c.viewProps;
					this.view = new Dd(b, {
						value: this.value,
						viewProps: this.viewProps
					});
					this.ptHandler_ = new Zb(this.view.element);
					this.ptHandler_.emitter.on("down", this.onPointerDown_);
					this.ptHandler_.emitter.on("move", this.onPointerMove_);
					this.ptHandler_.emitter.on("up", this.onPointerUp_);
					this.view.element.addEventListener("keydown", this.onKeyDown_);
					this.view.element.addEventListener("keyup", this.onKeyUp_);
				}
				handlePointerEvent_(f, g) {
					if (!f.point) {
						return;
					}
					const a = E(G(f.point.x, 0, f.bounds.width), 0, f.bounds.width, 0, 360);
					const h = this.value.rawValue;
					const [, b, c, d] = h.getComponents("hsv");
					this.value.setRawValue(new Ec([a, b, c, d], "hsv"), g);
				}
				onPointerDown_(a) {
					this.handlePointerEvent_(a.data, {
						forceEmit: false,
						last: false
					});
				}
				onPointerMove_(a) {
					this.handlePointerEvent_(a.data, {
						forceEmit: false,
						last: false
					});
				}
				onPointerUp_(a) {
					this.handlePointerEvent_(a.data, {
						forceEmit: true,
						last: true
					});
				}
				onKeyDown_(f) {
					const g = Ub(Jc(false), Wb(f));
					if (g === 0) {
						return;
					}
					const h = this.value.rawValue;
					const [a, b, c, d] = h.getComponents("hsv");
					this.value.setRawValue(new Ec([a + g, b, c, d], "hsv"), {
						forceEmit: false,
						last: false
					});
				}
				onKeyUp_(a) {
					if (Ub(Jc(false), Wb(a)) !== 0) {
						this.value.setRawValue(this.value.rawValue, {
							forceEmit: true,
							last: true
						});
					}
				}
			}
			const Fd = qa("svp");
			class Gd {
				constructor(e, c) {
					this.onValueChange_ = this.onValueChange_.bind(this);
					this.value = c.value;
					this.value.emitter.on("change", this.onValueChange_);
					this.element = e.createElement("div");
					this.element.classList.add(Fd());
					c.viewProps.bindClassModifiers(this.element);
					c.viewProps.bindTabIndex(this.element);
					const a = e.createElement("canvas");
					a.height = 64;
					a.width = 64;
					a.classList.add(Fd("c"));
					this.element.appendChild(a);
					this.canvasElement = a;
					const b = e.createElement("div");
					b.classList.add(Fd("m"));
					this.element.appendChild(b);
					this.markerElem_ = b;
					this.update_();
				}
				update_() {
					const c = function (c) {
						const a = c.ownerDocument.defaultView;
						if (a && "document" in a) {
							return c.getContext("2d", {
								willReadFrequently: true
							});
						} else {
							return null;
						}
					}(this.canvasElement);
					if (!c) {
						return;
					}
					const l = this.value.rawValue.getComponents("hsv");
					const f = this.canvasElement.width;
					const i = this.canvasElement.height;
					const d = c.getImageData(0, 0, f, i);
					const j = d.data;
					for (let c = 0; c < i; c++) {
						for (let d = 0; d < f; d++) {
							const e = E(d, 0, f, 0, 100);
							const g = E(c, 0, i, 100, 0);
							const h = wc(l[0], e, g);
							const a = (c * f + d) * 4;
							j[a] = h[0];
							j[a + 1] = h[1];
							j[a + 2] = h[2];
							j[a + 3] = 255;
						}
					}
					c.putImageData(d, 0, 0);
					const e = E(l[1], 0, 100, 0, 100);
					this.markerElem_.style.left = e + "%";
					const a = E(l[2], 0, 100, 100, 0);
					this.markerElem_.style.top = a + "%";
				}
				onValueChange_() {
					this.update_();
				}
			}
			class Hd {
				constructor(b, c) {
					this.onKeyDown_ = this.onKeyDown_.bind(this);
					this.onKeyUp_ = this.onKeyUp_.bind(this);
					this.onPointerDown_ = this.onPointerDown_.bind(this);
					this.onPointerMove_ = this.onPointerMove_.bind(this);
					this.onPointerUp_ = this.onPointerUp_.bind(this);
					this.value = c.value;
					this.viewProps = c.viewProps;
					this.view = new Gd(b, {
						value: this.value,
						viewProps: this.viewProps
					});
					this.ptHandler_ = new Zb(this.view.element);
					this.ptHandler_.emitter.on("down", this.onPointerDown_);
					this.ptHandler_.emitter.on("move", this.onPointerMove_);
					this.ptHandler_.emitter.on("up", this.onPointerUp_);
					this.view.element.addEventListener("keydown", this.onKeyDown_);
					this.view.element.addEventListener("keyup", this.onKeyUp_);
				}
				handlePointerEvent_(f, g) {
					if (!f.point) {
						return;
					}
					const a = E(f.point.x, 0, f.bounds.width, 0, 100);
					const b = E(f.point.y, 0, f.bounds.height, 100, 0);
					const [c, , , d] = this.value.rawValue.getComponents("hsv");
					this.value.setRawValue(new Ec([c, a, b, d], "hsv"), g);
				}
				onPointerDown_(b) {
					this.handlePointerEvent_(b.data, {
						forceEmit: false,
						last: false
					});
				}
				onPointerMove_(a) {
					this.handlePointerEvent_(a.data, {
						forceEmit: false,
						last: false
					});
				}
				onPointerUp_(b) {
					this.handlePointerEvent_(b.data, {
						forceEmit: true,
						last: true
					});
				}
				onKeyDown_(g) {
					if (Xb(g.key)) {
						g.preventDefault();
					}
					const [h, i, a, b] = this.value.rawValue.getComponents("hsv");
					const c = Jc(false);
					const d = Ub(c, Wb(g));
					const e = Ub(c, Vb(g));
					if (d !== 0 || e !== 0) {
						this.value.setRawValue(new Ec([h, i + d, a + e, b], "hsv"), {
							forceEmit: false,
							last: false
						});
					}
				}
				onKeyUp_(b) {
					const c = Jc(false);
					const d = Ub(c, Wb(b));
					const e = Ub(c, Vb(b));
					if (d !== 0 || e !== 0) {
						this.value.setRawValue(this.value.rawValue, {
							forceEmit: true,
							last: true
						});
					}
				}
			}
			class Id {
				constructor(b, c) {
					this.value = c.value;
					this.viewProps = c.viewProps;
					this.hPaletteC_ = new Ed(b, {
						value: this.value,
						viewProps: this.viewProps
					});
					this.svPaletteC_ = new Hd(b, {
						value: this.value,
						viewProps: this.viewProps
					});
					this.alphaIcs_ = c.supportsAlpha ? {
						palette: new xd(b, {
							value: this.value,
							viewProps: this.viewProps
						}),
						text: new ac(b, {
							parser: z,
							props: th.fromObject({
								pointerScale: 0.01,
								keyScale: 0.1,
								formatter: D(2)
							}),
							value: sh(0, {
								constraint: new i({
									min: 0,
									max: 1
								})
							}),
							viewProps: this.viewProps
						})
					} : null;
					if (this.alphaIcs_) {
						Tb({
							primary: this.value,
							secondary: this.alphaIcs_.text.value,
							forward: b => b.getComponents()[3],
							backward: (a, b) => {
								const c = a.getComponents();
								c[3] = b;
								return new Ec(c, a.mode);
							}
						});
					}
					this.textsC_ = new Bd(b, {
						colorType: c.colorType,
						value: this.value,
						viewProps: this.viewProps
					});
					this.view = new Gc(b, {
						alphaViews: this.alphaIcs_ ? {
							palette: this.alphaIcs_.palette.view,
							text: this.alphaIcs_.text.view
						} : null,
						hPaletteView: this.hPaletteC_.view,
						supportsAlpha: c.supportsAlpha,
						svPaletteView: this.svPaletteC_.view,
						textsView: this.textsC_.view,
						viewProps: this.viewProps
					});
				}
				get textsController() {
					return this.textsC_;
				}
			}
			const Jd = qa("colsw");
			class Kd {
				constructor(c, e) {
					this.onValueChange_ = this.onValueChange_.bind(this);
					e.value.emitter.on("change", this.onValueChange_);
					this.value = e.value;
					this.element = c.createElement("div");
					this.element.classList.add(Jd());
					e.viewProps.bindClassModifiers(this.element);
					const a = c.createElement("div");
					a.classList.add(Jd("sw"));
					this.element.appendChild(a);
					this.swatchElem_ = a;
					const d = c.createElement("button");
					d.classList.add(Jd("b"));
					e.viewProps.bindDisabled(d);
					this.element.appendChild(d);
					this.buttonElement = d;
					this.update_();
				}
				update_() {
					const b = this.value.rawValue;
					this.swatchElem_.style.backgroundColor = md(b);
				}
				onValueChange_() {
					this.update_();
				}
			}
			class Ld {
				constructor(c, b) {
					this.value = b.value;
					this.viewProps = b.viewProps;
					this.view = new Kd(c, {
						value: this.value,
						viewProps: this.viewProps
					});
				}
			}
			class Md {
				constructor(a, c) {
					this.onButtonBlur_ = this.onButtonBlur_.bind(this);
					this.onButtonClick_ = this.onButtonClick_.bind(this);
					this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
					this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
					this.value = c.value;
					this.viewProps = c.viewProps;
					this.foldable_ = Za.create(c.expanded);
					this.swatchC_ = new Ld(a, {
						value: this.value,
						viewProps: this.viewProps
					});
					const d = this.swatchC_.view.buttonElement;
					d.addEventListener("blur", this.onButtonBlur_);
					d.addEventListener("click", this.onButtonClick_);
					this.textC_ = new Mb(a, {
						parser: c.parser,
						props: th.fromObject({
							formatter: c.formatter
						}),
						value: this.value,
						viewProps: this.viewProps
					});
					this.view = new vc(a, {
						foldable: this.foldable_,
						pickerLayout: c.pickerLayout
					});
					this.view.swatchElement.appendChild(this.swatchC_.view.element);
					this.view.textElement.appendChild(this.textC_.view.element);
					this.popC_ = c.pickerLayout === "popup" ? new Jb(a, {
						viewProps: this.viewProps
					}) : null;
					const b = new Id(a, {
						colorType: c.colorType,
						supportsAlpha: c.supportsAlpha,
						value: this.value,
						viewProps: this.viewProps
					});
					b.view.allFocusableElements.forEach(b => {
						b.addEventListener("blur", this.onPopupChildBlur_);
						b.addEventListener("keydown", this.onPopupChildKeydown_);
					});
					this.pickerC_ = b;
					if (this.popC_) {
						this.view.element.appendChild(this.popC_.view.element);
						this.popC_.view.element.appendChild(b.view.element);
						Tb({
							primary: this.foldable_.value("expanded"),
							secondary: this.popC_.shows,
							forward: b => b,
							backward: (b, c) => c
						});
					} else if (this.view.pickerElement) {
						this.view.pickerElement.appendChild(this.pickerC_.view.element);
						_a(this.foldable_, this.view.pickerElement);
					}
				}
				get textController() {
					return this.textC_;
				}
				onButtonBlur_(b) {
					if (!this.popC_) {
						return;
					}
					const c = this.view.element;
					const d = b.relatedTarget;
					if (!d || !c.contains(d)) {
						this.popC_.shows.rawValue = false;
					}
				}
				onButtonClick_() {
					this.foldable_.set("expanded", !this.foldable_.get("expanded"));
					if (this.foldable_.get("expanded")) {
						this.pickerC_.view.allFocusableElements[0].focus();
					}
				}
				onPopupChildBlur_(b) {
					if (!this.popC_) {
						return;
					}
					const c = this.popC_.view.element;
					const d = ma(b);
					if ((!d || !c.contains(d)) && (!d || d !== this.swatchC_.view.buttonElement || !!ga(c.ownerDocument))) {
						this.popC_.shows.rawValue = false;
					}
				}
				onPopupChildKeydown_(b) {
					if (this.popC_) {
						if (b.key === "Escape") {
							this.popC_.shows.rawValue = false;
						}
					} else if (this.view.pickerElement && b.key === "Escape") {
						this.swatchC_.view.buttonElement.focus();
					}
				}
			}
			function Nd(b) {
				return xc(b.getComponents("rgb")).reduce((c, a) => c << 8 | Math.floor(a) & 255, 0);
			}
			function Od(a) {
				return a.getComponents("rgb").reduce((c, a, b) => c << 8 | Math.floor(b === 3 ? a * 255 : a) & 255, 0) >>> 0;
			}
			function Pd(c) {
				if (typeof c != "number") {
					return Ec.black();
				} else {
					return new Ec([(a = c) >> 16 & 255, a >> 8 & 255, a & 255], "rgb");
				}
				var a;
			}
			function Qd(c) {
				if (typeof c != "number") {
					return Ec.black();
				} else {
					return new Ec([(a = c) >> 24 & 255, a >> 16 & 255, a >> 8 & 255, E(a & 255, 0, 255, 0, 1)], "rgb");
				}
				var a;
			}
			function Rd(c, b) {
				return typeof c == "object" && !qh(c) && b in c && typeof c[b] == "number";
			}
			function Sd(b) {
				return Rd(b, "r") && Rd(b, "g") && Rd(b, "b");
			}
			function Td(b) {
				return Sd(b) && Rd(b, "a");
			}
			function Ud(b) {
				return Sd(b);
			}
			function Vd(c, d) {
				if (c.mode !== d.mode) {
					return false;
				}
				if (c.type !== d.type) {
					return false;
				}
				const a = c.getComponents();
				const b = d.getComponents();
				for (let e = 0; e < a.length; e++) {
					if (a[e] !== b[e]) {
						return false;
					}
				}
				return true;
			}
			function Wd(b) {
				if ("a" in b) {
					return [b.r, b.g, b.b, b.a];
				} else {
					return [b.r, b.g, b.b];
				}
			}
			const Xd = Oa({
				id: "input-color-number",
				type: "input",
				accept: (c, d) => {
					if (typeof c != "number") {
						return null;
					}
					if (!function (a) {
						return "color" in a || a.view === "color";
					}(d)) {
						return null;
					}
					const a = Ic(d);
					if (a) {
						return {
							initialValue: c,
							params: Object.assign(Object.assign({}, a), {
								supportsAlpha: (e = d, !!(e == null ? undefined : e.color)?.alpha)
							})
						};
					} else {
						return null;
					}
					var e;
				},
				binding: {
					reader: b => b.params.supportsAlpha ? Qd : Pd,
					equals: Vd,
					writer: b => function (a) {
						const d = a ? Od : Nd;
						return (b, a) => {
							pc(b, d(a));
						};
					}(b.params.supportsAlpha)
				},
				controller: b => {
					var a;
					var e;
					return new Md(b.document, {
						colorType: "int",
						expanded: (a = b.params.expanded) !== null && a !== undefined && a,
						formatter: (e = b.params.supportsAlpha, e ? b => md(b, "0x") : b => ld(b, "0x")),
						parser: id("int"),
						pickerLayout: b.params.picker ?? "popup",
						supportsAlpha: b.params.supportsAlpha,
						value: b.value,
						viewProps: b.viewProps
					});
				}
			});
			function Yd(d, a) {
				return b => d ? rd(b, a) : pd(b, a);
			}
			const Zd = Oa({
				id: "input-color-object",
				type: "input",
				accept: (a, b) => {
					if (!Ud(a)) {
						return null;
					}
					const d = Ic(b);
					if (d) {
						return {
							initialValue: a,
							params: Object.assign(Object.assign({}, d), {
								colorType: Kc(b) ?? "int"
							})
						};
					} else {
						return null;
					}
				},
				binding: {
					reader: c => {
						e = c.params.colorType;
						return b => {
							const a = function (b, c) {
								if (!Ud(b)) {
									return Oc(Ec.black(), c);
								}
								if (c === "int") {
									const c = Wd(b);
									return new Ec(c, "rgb");
								}
								if (c === "float") {
									const c = Wd(b);
									return new Lc(c, "rgb");
								}
								return Oc(Ec.black(), "int");
							}(b, e);
							return Oc(a, "int");
						};
						var e;
					},
					equals: Vd,
					writer: a => {
						b = Td(a.initialValue);
						f = a.params.colorType;
						return (c, d) => {
							if (b) {
								(function (d, a, b) {
									const e = Oc(a, b).toRgbaObject();
									d.writeProperty("r", e.r);
									d.writeProperty("g", e.g);
									d.writeProperty("b", e.b);
									d.writeProperty("a", e.a);
								})(c, d, f);
							} else {
								(function (b, a, c) {
									const d = Oc(a, c).toRgbaObject();
									b.writeProperty("r", d.r);
									b.writeProperty("g", d.g);
									b.writeProperty("b", d.b);
								})(c, d, f);
							}
						};
						var b;
						var f;
					}
				},
				controller: d => {
					var a;
					const e = Td(d.initialValue);
					return new Md(d.document, {
						colorType: d.params.colorType,
						expanded: (a = d.params.expanded) !== null && a !== undefined && a,
						formatter: Yd(e, d.params.colorType),
						parser: id("int"),
						pickerLayout: d.params.picker ?? "popup",
						supportsAlpha: e,
						value: d.value,
						viewProps: d.viewProps
					});
				}
			});
			const $d = Oa({
				id: "input-color-string",
				type: "input",
				accept: (b, d) => {
					if (typeof b != "string") {
						return null;
					}
					if (d.view === "text") {
						return null;
					}
					const f = function (d, c = "int") {
						const a = function (a) {
							return hd.reduce((b, {
								parser: c,
								result: d
							}) => b || (c(a) ? d : null), null);
						}(d);
						if (a) {
							if (a.notation === "hex" && c !== "float") {
								return Object.assign(Object.assign({}, a), {
									type: "int"
								});
							} else if (a.notation === "func") {
								return Object.assign(Object.assign({}, a), {
									type: c
								});
							} else {
								return null;
							}
						} else {
							return null;
						}
					}(b, Kc(d));
					if (!f) {
						return null;
					}
					const e = ud(f);
					if (!e) {
						return null;
					}
					const c = Ic(d);
					if (c) {
						return {
							initialValue: b,
							params: Object.assign(Object.assign({}, c), {
								format: f,
								stringifier: e
							})
						};
					} else {
						return null;
					}
				},
				binding: {
					reader: () => jd,
					equals: Vd,
					writer: a => {
						const b = function (a) {
							const d = ud(a);
							if (d) {
								return (b, a) => {
									pc(b, d(a));
								};
							} else {
								return null;
							}
						}(a.params.format);
						if (!b) {
							throw hh.notBindable();
						}
						return b;
					}
				},
				controller: b => {
					var a;
					return new Md(b.document, {
						colorType: b.params.format.type,
						expanded: (a = b.params.expanded) !== null && a !== undefined && a,
						formatter: b.params.stringifier,
						parser: id("int"),
						pickerLayout: b.params.picker ?? "popup",
						supportsAlpha: b.params.format.alpha,
						value: b.value,
						viewProps: b.viewProps
					});
				}
			});
			class _d {
				constructor(b) {
					this.components = b.components;
					this.asm_ = b.assembly;
				}
				constrain(c) {
					const a = this.asm_.toComponents(c).map((a, c) => {
						var d;
						return ((d = this.components[c]) === null || d === undefined ? undefined : d.constrain(a)) ?? a;
					});
					return this.asm_.fromComponents(a);
				}
			}
			const ae = qa("pndtxt");
			class be {
				constructor(a, b) {
					this.textViews = b.textViews;
					this.element = a.createElement("div");
					this.element.classList.add(ae());
					this.textViews.forEach(b => {
						const c = a.createElement("div");
						c.classList.add(ae("a"));
						c.appendChild(b.element);
						this.element.appendChild(c);
					});
				}
			}
			class ce {
				constructor(d, f) {
					this.value = f.value;
					this.viewProps = f.viewProps;
					this.acs_ = f.axes.map((a, b) => function (c, a, b) {
						return new ac(c, {
							arrayPosition: b === 0 ? "fst" : b === a.axes.length - 1 ? "lst" : "mid",
							parser: a.parser,
							props: a.axes[b].textProps,
							value: sh(0, {
								constraint: a.axes[b].constraint
							}),
							viewProps: a.viewProps
						});
					}(d, f, b));
					this.acs_.forEach((b, g) => {
						Tb({
							primary: this.value,
							secondary: b.value,
							forward: b => f.assembly.toComponents(b)[g],
							backward: (a, b) => {
								const d = f.assembly.toComponents(a);
								d[g] = b;
								return f.assembly.fromComponents(d);
							}
						});
					});
					this.view = new be(d, {
						textViews: this.acs_.map(b => b.view)
					});
				}
				get textControllers() {
					return this.acs_;
				}
			}
			class de extends W {
				get max() {
					return this.controller.valueController.sliderController.props.get("max");
				}
				set max(b) {
					this.controller.valueController.sliderController.props.set("max", b);
				}
				get min() {
					return this.controller.valueController.sliderController.props.get("min");
				}
				set min(a) {
					this.controller.valueController.sliderController.props.set("min", a);
				}
			}
			const ee = Oa({
				id: "input-number",
				type: "input",
				accept: (b, c) => {
					if (typeof b != "number") {
						return null;
					}
					const a = _(c, a => Object.assign(Object.assign({}, O(a)), {
						options: a.optional.custom(Bb),
						readonly: a.optional.constant(false)
					}));
					if (a) {
						return {
							initialValue: b,
							params: a
						};
					} else {
						return null;
					}
				},
				binding: {
					reader: b => B,
					constraint: b => function (d, e) {
						const f = [];
						const g = L(d, e);
						if (g) {
							f.push(g);
						}
						const a = M(d);
						if (a) {
							f.push(a);
						}
						const b = Db(d.options);
						if (b) {
							f.push(b);
						}
						return new yb(f);
					}(b.params, b.initialValue),
					writer: b => pc
				},
				controller: e => {
					const f = e.value;
					const g = e.constraint;
					const a = g && zb(g, Ab);
					if (a) {
						return new Gb(e.document, {
							props: new th({
								options: a.values.value("options")
							}),
							value: f,
							viewProps: e.viewProps
						});
					}
					const b = N(e.params, f.rawValue);
					const c = g && zb(g, i);
					if (c) {
						return new gc(e.document, Object.assign(Object.assign({}, hc(Object.assign(Object.assign({}, b), {
							keyScale: sh(b.keyScale),
							max: c.values.value("max"),
							min: c.values.value("min")
						}))), {
							parser: z,
							value: f,
							viewProps: e.viewProps
						}));
					} else {
						return new ac(e.document, {
							parser: z,
							props: th.fromObject(b),
							value: f,
							viewProps: e.viewProps
						});
					}
				},
				api: b => typeof b.controller.value.rawValue != "number" ? null : b.controller.valueController instanceof gc ? new de(b.controller) : b.controller.valueController instanceof Gb ? new vb(b.controller) : null
			});
			class fe {
				constructor(b = 0, c = 0) {
					this.x = b;
					this.y = c;
				}
				getComponents() {
					return [this.x, this.y];
				}
				static isObject(a) {
					if (qh(a)) {
						return false;
					}
					const b = a.x;
					const c = a.y;
					return typeof b == "number" && typeof c == "number";
				}
				static equals(b, c) {
					return b.x === c.x && b.y === c.y;
				}
				toObject() {
					return {
						x: this.x,
						y: this.y
					};
				}
			}
			const ge = {
				toComponents: b => b.getComponents(),
				fromComponents: b => new fe(...b)
			};
			const he = qa("p2d");
			class ie {
				constructor(d, e) {
					this.element = d.createElement("div");
					this.element.classList.add(he());
					e.viewProps.bindClassModifiers(this.element);
					na(e.expanded, Ga(this.element, he(undefined, "expanded")));
					const f = d.createElement("div");
					f.classList.add(he("h"));
					this.element.appendChild(f);
					const b = d.createElement("button");
					b.classList.add(he("b"));
					b.appendChild(ia(d, "p2dpad"));
					e.viewProps.bindDisabled(b);
					f.appendChild(b);
					this.buttonElement = b;
					const c = d.createElement("div");
					c.classList.add(he("t"));
					f.appendChild(c);
					this.textElement = c;
					if (e.pickerLayout === "inline") {
						const a = d.createElement("div");
						a.classList.add(he("p"));
						this.element.appendChild(a);
						this.pickerElement = a;
					} else {
						this.pickerElement = null;
					}
				}
			}
			const je = qa("p2dp");
			class ke {
				constructor(h, f) {
					this.onFoldableChange_ = this.onFoldableChange_.bind(this);
					this.onPropsChange_ = this.onPropsChange_.bind(this);
					this.onValueChange_ = this.onValueChange_.bind(this);
					this.props_ = f.props;
					this.props_.emitter.on("change", this.onPropsChange_);
					this.element = h.createElement("div");
					this.element.classList.add(je());
					if (f.layout === "popup") {
						this.element.classList.add(je(undefined, "p"));
					}
					f.viewProps.bindClassModifiers(this.element);
					const a = h.createElement("div");
					a.classList.add(je("p"));
					f.viewProps.bindTabIndex(a);
					this.element.appendChild(a);
					this.padElement = a;
					const i = h.createElementNS(ea, "svg");
					i.classList.add(je("g"));
					this.padElement.appendChild(i);
					this.svgElem_ = i;
					const b = h.createElementNS(ea, "line");
					b.classList.add(je("ax"));
					b.setAttributeNS(null, "x1", "0");
					b.setAttributeNS(null, "y1", "50%");
					b.setAttributeNS(null, "x2", "100%");
					b.setAttributeNS(null, "y2", "50%");
					this.svgElem_.appendChild(b);
					const c = h.createElementNS(ea, "line");
					c.classList.add(je("ax"));
					c.setAttributeNS(null, "x1", "50%");
					c.setAttributeNS(null, "y1", "0");
					c.setAttributeNS(null, "x2", "50%");
					c.setAttributeNS(null, "y2", "100%");
					this.svgElem_.appendChild(c);
					const d = h.createElementNS(ea, "line");
					d.classList.add(je("l"));
					d.setAttributeNS(null, "x1", "50%");
					d.setAttributeNS(null, "y1", "50%");
					this.svgElem_.appendChild(d);
					this.lineElem_ = d;
					const e = h.createElement("div");
					e.classList.add(je("m"));
					this.padElement.appendChild(e);
					this.markerElem_ = e;
					f.value.emitter.on("change", this.onValueChange_);
					this.value = f.value;
					this.update_();
				}
				get allFocusableElements() {
					return [this.padElement];
				}
				update_() {
					const [e, f] = this.value.rawValue.getComponents();
					const g = this.props_.get("max");
					const a = E(e, -g, +g, 0, 100);
					const b = E(f, -g, +g, 0, 100);
					const c = this.props_.get("invertsY") ? 100 - b : b;
					this.lineElem_.setAttributeNS(null, "x2", a + "%");
					this.lineElem_.setAttributeNS(null, "y2", c + "%");
					this.markerElem_.style.left = a + "%";
					this.markerElem_.style.top = c + "%";
				}
				onValueChange_() {
					this.update_();
				}
				onPropsChange_() {
					this.update_();
				}
				onFoldableChange_() {
					this.update_();
				}
			}
			function le(d, a, b) {
				return [Ub(a[0], Wb(d)), Ub(a[1], Vb(d)) * (b ? 1 : -1)];
			}
			class me {
				constructor(c, b) {
					this.onPadKeyDown_ = this.onPadKeyDown_.bind(this);
					this.onPadKeyUp_ = this.onPadKeyUp_.bind(this);
					this.onPointerDown_ = this.onPointerDown_.bind(this);
					this.onPointerMove_ = this.onPointerMove_.bind(this);
					this.onPointerUp_ = this.onPointerUp_.bind(this);
					this.props = b.props;
					this.value = b.value;
					this.viewProps = b.viewProps;
					this.view = new ke(c, {
						layout: b.layout,
						props: this.props,
						value: this.value,
						viewProps: this.viewProps
					});
					this.ptHandler_ = new Zb(this.view.padElement);
					this.ptHandler_.emitter.on("down", this.onPointerDown_);
					this.ptHandler_.emitter.on("move", this.onPointerMove_);
					this.ptHandler_.emitter.on("up", this.onPointerUp_);
					this.view.padElement.addEventListener("keydown", this.onPadKeyDown_);
					this.view.padElement.addEventListener("keyup", this.onPadKeyUp_);
				}
				handlePointerEvent_(d, e) {
					if (!d.point) {
						return;
					}
					const a = this.props.get("max");
					const f = E(d.point.x, 0, d.bounds.width, -a, +a);
					const b = E(this.props.get("invertsY") ? d.bounds.height - d.point.y : d.point.y, 0, d.bounds.height, -a, +a);
					this.value.setRawValue(new fe(f, b), e);
				}
				onPointerDown_(a) {
					this.handlePointerEvent_(a.data, {
						forceEmit: false,
						last: false
					});
				}
				onPointerMove_(b) {
					this.handlePointerEvent_(b.data, {
						forceEmit: false,
						last: false
					});
				}
				onPointerUp_(b) {
					this.handlePointerEvent_(b.data, {
						forceEmit: true,
						last: true
					});
				}
				onPadKeyDown_(b) {
					if (Xb(b.key)) {
						b.preventDefault();
					}
					const [c, d] = le(b, [this.props.get("xKeyScale"), this.props.get("yKeyScale")], this.props.get("invertsY"));
					if (c !== 0 || d !== 0) {
						this.value.setRawValue(new fe(this.value.rawValue.x + c, this.value.rawValue.y + d), {
							forceEmit: false,
							last: false
						});
					}
				}
				onPadKeyUp_(c) {
					const [d, b] = le(c, [this.props.get("xKeyScale"), this.props.get("yKeyScale")], this.props.get("invertsY"));
					if (d !== 0 || b !== 0) {
						this.value.setRawValue(this.value.rawValue, {
							forceEmit: true,
							last: true
						});
					}
				}
			}
			class ne {
				constructor(c, a) {
					var d;
					var e;
					this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
					this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
					this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this);
					this.onPadButtonClick_ = this.onPadButtonClick_.bind(this);
					this.value = a.value;
					this.viewProps = a.viewProps;
					this.foldable_ = Za.create(a.expanded);
					this.popC_ = a.pickerLayout === "popup" ? new Jb(c, {
						viewProps: this.viewProps
					}) : null;
					const h = new me(c, {
						layout: a.pickerLayout,
						props: new th({
							invertsY: sh(a.invertsY),
							max: sh(a.max),
							xKeyScale: a.axes[0].textProps.value("keyScale"),
							yKeyScale: a.axes[1].textProps.value("keyScale")
						}),
						value: this.value,
						viewProps: this.viewProps
					});
					h.view.allFocusableElements.forEach(b => {
						b.addEventListener("blur", this.onPopupChildBlur_);
						b.addEventListener("keydown", this.onPopupChildKeydown_);
					});
					this.pickerC_ = h;
					this.textC_ = new ce(c, {
						assembly: ge,
						axes: a.axes,
						parser: a.parser,
						value: this.value,
						viewProps: this.viewProps
					});
					this.view = new ie(c, {
						expanded: this.foldable_.value("expanded"),
						pickerLayout: a.pickerLayout,
						viewProps: this.viewProps
					});
					this.view.textElement.appendChild(this.textC_.view.element);
					if ((d = this.view.buttonElement) !== null && d !== undefined) {
						d.addEventListener("blur", this.onPadButtonBlur_);
					}
					if ((e = this.view.buttonElement) !== null && e !== undefined) {
						e.addEventListener("click", this.onPadButtonClick_);
					}
					if (this.popC_) {
						this.view.element.appendChild(this.popC_.view.element);
						this.popC_.view.element.appendChild(this.pickerC_.view.element);
						Tb({
							primary: this.foldable_.value("expanded"),
							secondary: this.popC_.shows,
							forward: b => b,
							backward: (b, c) => c
						});
					} else if (this.view.pickerElement) {
						this.view.pickerElement.appendChild(this.pickerC_.view.element);
						_a(this.foldable_, this.view.pickerElement);
					}
				}
				get textController() {
					return this.textC_;
				}
				onPadButtonBlur_(a) {
					if (!this.popC_) {
						return;
					}
					const b = this.view.element;
					const c = a.relatedTarget;
					if (!c || !b.contains(c)) {
						this.popC_.shows.rawValue = false;
					}
				}
				onPadButtonClick_() {
					this.foldable_.set("expanded", !this.foldable_.get("expanded"));
					if (this.foldable_.get("expanded")) {
						this.pickerC_.view.allFocusableElements[0].focus();
					}
				}
				onPopupChildBlur_(c) {
					if (!this.popC_) {
						return;
					}
					const a = this.popC_.view.element;
					const d = ma(c);
					if ((!d || !a.contains(d)) && (!d || d !== this.view.buttonElement || !!ga(a.ownerDocument))) {
						this.popC_.shows.rawValue = false;
					}
				}
				onPopupChildKeydown_(b) {
					if (this.popC_) {
						if (b.key === "Escape") {
							this.popC_.shows.rawValue = false;
						}
					} else if (this.view.pickerElement && b.key === "Escape") {
						this.view.buttonElement.focus();
					}
				}
			}
			function oe(a) {
				if (fe.isObject(a)) {
					return new fe(a.x, a.y);
				} else {
					return new fe();
				}
			}
			function pe(c, a) {
				c.writeProperty("x", a.x);
				c.writeProperty("y", a.y);
			}
			function qe(a, c) {
				if (!qh(a.min) || !qh(a.max)) {
					return Math.max(Math.abs(a.min ?? 0), Math.abs(a.max ?? 0));
				}
				const d = J(a);
				return Math.max(Math.abs(d) * 10, Math.abs(c) * 10);
			}
			function re(b, c) {
				const a = qe(bh(b, b.x ?? {}), c.x);
				const d = qe(bh(b, b.y ?? {}), c.y);
				return Math.max(a, d);
			}
			function se(c) {
				if (!("y" in c)) {
					return false;
				}
				const a = c.y;
				return !!a && "inverted" in a && !!a.inverted;
			}
			const te = Oa({
				id: "input-point2d",
				type: "input",
				accept: (b, c) => {
					if (!fe.isObject(b)) {
						return null;
					}
					const a = _(c, a => Object.assign(Object.assign({}, kc(a)), {
						expanded: a.optional.boolean,
						picker: a.optional.custom(oc),
						readonly: a.optional.constant(false),
						x: a.optional.custom(lc),
						y: a.optional.object(Object.assign(Object.assign({}, kc(a)), {
							inverted: a.optional.boolean
						}))
					}));
					if (a) {
						return {
							initialValue: b,
							params: a
						};
					} else {
						return null;
					}
				},
				binding: {
					reader: () => oe,
					constraint: d => {
						a = d.params;
						e = d.initialValue;
						return new _d({
							assembly: ge,
							components: [mc(Object.assign(Object.assign({}, a), a.x), e.x), mc(Object.assign(Object.assign({}, a), a.y), e.y)]
						});
						var a;
						var e;
					},
					equals: fe.equals,
					writer: () => pe
				},
				controller: f => {
					var a;
					const b = f.document;
					const d = f.value;
					const e = f.constraint;
					const g = [f.params.x, f.params.y];
					return new ne(b, {
						axes: d.rawValue.getComponents().map((a, b) => {
							return P({
								constraint: e.components[b],
								initialValue: a,
								params: bh(f.params, g[b] ?? {})
							});
						}),
						expanded: (a = f.params.expanded) !== null && a !== undefined && a,
						invertsY: se(f.params),
						max: re(f.params, d.rawValue),
						parser: z,
						pickerLayout: f.params.picker ?? "popup",
						value: d,
						viewProps: f.viewProps
					});
				}
			});
			class ue {
				constructor(d = 0, a = 0, b = 0) {
					this.x = d;
					this.y = a;
					this.z = b;
				}
				getComponents() {
					return [this.x, this.y, this.z];
				}
				static isObject(b) {
					if (qh(b)) {
						return false;
					}
					const c = b.x;
					const d = b.y;
					const e = b.z;
					return typeof c == "number" && typeof d == "number" && typeof e == "number";
				}
				static equals(b, c) {
					return b.x === c.x && b.y === c.y && b.z === c.z;
				}
				toObject() {
					return {
						x: this.x,
						y: this.y,
						z: this.z
					};
				}
			}
			const ve = {
				toComponents: b => b.getComponents(),
				fromComponents: b => new ue(...b)
			};
			function we(a) {
				if (ue.isObject(a)) {
					return new ue(a.x, a.y, a.z);
				} else {
					return new ue();
				}
			}
			function xe(c, b) {
				c.writeProperty("x", b.x);
				c.writeProperty("y", b.y);
				c.writeProperty("z", b.z);
			}
			const ye = Oa({
				id: "input-point3d",
				type: "input",
				accept: (b, c) => {
					if (!ue.isObject(b)) {
						return null;
					}
					const a = _(c, a => Object.assign(Object.assign({}, kc(a)), {
						readonly: a.optional.constant(false),
						x: a.optional.custom(lc),
						y: a.optional.custom(lc),
						z: a.optional.custom(lc)
					}));
					if (a) {
						return {
							initialValue: b,
							params: a
						};
					} else {
						return null;
					}
				},
				binding: {
					reader: b => we,
					constraint: a => {
						b = a.params;
						e = a.initialValue;
						return new _d({
							assembly: ve,
							components: [mc(Object.assign(Object.assign({}, b), b.x), e.x), mc(Object.assign(Object.assign({}, b), b.y), e.y), mc(Object.assign(Object.assign({}, b), b.z), e.z)]
						});
						var b;
						var e;
					},
					equals: ue.equals,
					writer: b => xe
				},
				controller: f => {
					const b = f.value;
					const g = f.constraint;
					const a = [f.params.x, f.params.y, f.params.z];
					return new ce(f.document, {
						assembly: ve,
						axes: b.rawValue.getComponents().map((b, c) => {
							return P({
								constraint: g.components[c],
								initialValue: b,
								params: bh(f.params, a[c] ?? {})
							});
						}),
						parser: z,
						value: b,
						viewProps: f.viewProps
					});
				}
			});
			class ze {
				constructor(a = 0, b = 0, c = 0, d = 0) {
					this.x = a;
					this.y = b;
					this.z = c;
					this.w = d;
				}
				getComponents() {
					return [this.x, this.y, this.z, this.w];
				}
				static isObject(c) {
					if (qh(c)) {
						return false;
					}
					const d = c.x;
					const e = c.y;
					const f = c.z;
					const a = c.w;
					return typeof d == "number" && typeof e == "number" && typeof f == "number" && typeof a == "number";
				}
				static equals(b, c) {
					return b.x === c.x && b.y === c.y && b.z === c.z && b.w === c.w;
				}
				toObject() {
					return {
						x: this.x,
						y: this.y,
						z: this.z,
						w: this.w
					};
				}
			}
			const Ae = {
				toComponents: b => b.getComponents(),
				fromComponents: b => new ze(...b)
			};
			function Be(b) {
				if (ze.isObject(b)) {
					return new ze(b.x, b.y, b.z, b.w);
				} else {
					return new ze();
				}
			}
			function Ce(c, b) {
				c.writeProperty("x", b.x);
				c.writeProperty("y", b.y);
				c.writeProperty("z", b.z);
				c.writeProperty("w", b.w);
			}
			const De = Oa({
				id: "input-point4d",
				type: "input",
				accept: (b, c) => {
					if (!ze.isObject(b)) {
						return null;
					}
					const a = _(c, a => Object.assign(Object.assign({}, kc(a)), {
						readonly: a.optional.constant(false),
						w: a.optional.custom(lc),
						x: a.optional.custom(lc),
						y: a.optional.custom(lc),
						z: a.optional.custom(lc)
					}));
					if (a) {
						return {
							initialValue: b,
							params: a
						};
					} else {
						return null;
					}
				},
				binding: {
					reader: b => Be,
					constraint: a => {
						b = a.params;
						e = a.initialValue;
						return new _d({
							assembly: Ae,
							components: [mc(Object.assign(Object.assign({}, b), b.x), e.x), mc(Object.assign(Object.assign({}, b), b.y), e.y), mc(Object.assign(Object.assign({}, b), b.z), e.z), mc(Object.assign(Object.assign({}, b), b.w), e.w)]
						});
						var b;
						var e;
					},
					equals: ze.equals,
					writer: b => Ce
				},
				controller: f => {
					const d = f.value;
					const c = f.constraint;
					const a = [f.params.x, f.params.y, f.params.z, f.params.w];
					return new ce(f.document, {
						assembly: Ae,
						axes: d.rawValue.getComponents().map((b, d) => {
							return P({
								constraint: c.components[d],
								initialValue: b,
								params: bh(f.params, a[d] ?? {})
							});
						}),
						parser: z,
						value: d,
						viewProps: f.viewProps
					});
				}
			});
			const Ee = Oa({
				id: "input-string",
				type: "input",
				accept: (a, b) => {
					if (typeof a != "string") {
						return null;
					}
					const c = _(b, a => ({
						readonly: a.optional.constant(false),
						options: a.optional.custom(Bb)
					}));
					if (c) {
						return {
							initialValue: a,
							params: c
						};
					} else {
						return null;
					}
				},
				binding: {
					reader: b => Rb,
					constraint: b => function (a) {
						const b = [];
						const c = Db(a.options);
						if (c) {
							b.push(c);
						}
						return new yb(b);
					}(b.params),
					writer: b => pc
				},
				controller: e => {
					const a = e.document;
					const f = e.value;
					const b = e.constraint;
					const c = b && zb(b, Ab);
					if (c) {
						return new Gb(a, {
							props: new th({
								options: c.values.value("options")
							}),
							value: f,
							viewProps: e.viewProps
						});
					} else {
						return new Mb(a, {
							parser: b => b,
							props: th.fromObject({
								formatter: Sb
							}),
							value: f,
							viewProps: e.viewProps
						});
					}
				},
				api: b => typeof b.controller.value.rawValue != "string" ? null : b.controller.valueController instanceof Gb ? new vb(b.controller) : null
			});
			const Fe = {
				defaultInterval: 200,
				defaultRows: 3
			};
			const Ge = qa("mll");
			class He {
				constructor(d, c) {
					this.onValueUpdate_ = this.onValueUpdate_.bind(this);
					this.formatter_ = c.formatter;
					this.element = d.createElement("div");
					this.element.classList.add(Ge());
					c.viewProps.bindClassModifiers(this.element);
					const a = d.createElement("textarea");
					a.classList.add(Ge("i"));
					a.style.height = "calc(var(" + jc("containerUnitSize") + ") * " + c.rows + ")";
					a.readOnly = true;
					c.viewProps.bindDisabled(a);
					this.element.appendChild(a);
					this.textareaElem_ = a;
					c.value.emitter.on("change", this.onValueUpdate_);
					this.value = c.value;
					this.update_();
				}
				update_() {
					const b = this.textareaElem_;
					const c = b.scrollTop === b.scrollHeight - b.clientHeight;
					const d = [];
					this.value.rawValue.forEach(a => {
						if (a !== undefined) {
							d.push(this.formatter_(a));
						}
					});
					b.textContent = d.join("\n");
					if (c) {
						b.scrollTop = b.scrollHeight;
					}
				}
				onValueUpdate_() {
					this.update_();
				}
			}
			class Ie {
				constructor(c, b) {
					this.value = b.value;
					this.viewProps = b.viewProps;
					this.view = new He(c, {
						formatter: b.formatter,
						rows: b.rows,
						value: this.value,
						viewProps: this.viewProps
					});
				}
			}
			const Je = qa("sgl");
			class Le {
				constructor(b, c) {
					this.onValueUpdate_ = this.onValueUpdate_.bind(this);
					this.formatter_ = c.formatter;
					this.element = b.createElement("div");
					this.element.classList.add(Je());
					c.viewProps.bindClassModifiers(this.element);
					const a = b.createElement("input");
					a.classList.add(Je("i"));
					a.readOnly = true;
					a.type = "text";
					c.viewProps.bindDisabled(a);
					this.element.appendChild(a);
					this.inputElement = a;
					c.value.emitter.on("change", this.onValueUpdate_);
					this.value = c.value;
					this.update_();
				}
				update_() {
					const a = this.value.rawValue;
					const b = a[a.length - 1];
					this.inputElement.value = b !== undefined ? this.formatter_(b) : "";
				}
				onValueUpdate_() {
					this.update_();
				}
			}
			class Me {
				constructor(c, b) {
					this.value = b.value;
					this.viewProps = b.viewProps;
					this.view = new Le(c, {
						formatter: b.formatter,
						value: this.value,
						viewProps: this.viewProps
					});
				}
			}
			const Ne = Oa({
				id: "monitor-bool",
				type: "monitor",
				accept: (b, c) => {
					if (typeof b != "boolean") {
						return null;
					}
					const a = _(c, a => ({
						readonly: a.required.constant(true),
						rows: a.optional.number
					}));
					if (a) {
						return {
							initialValue: b,
							params: a
						};
					} else {
						return null;
					}
				},
				binding: {
					reader: b => Nb
				},
				controller: b => {
					if (b.value.rawValue.length === 1) {
						return new Me(b.document, {
							formatter: Ob,
							value: b.value,
							viewProps: b.viewProps
						});
					} else {
						return new Ie(b.document, {
							formatter: Ob,
							rows: b.params.rows ?? Fe.defaultRows,
							value: b.value,
							viewProps: b.viewProps
						});
					}
				}
			});
			class Oe extends W {
				get max() {
					return this.controller.valueController.props.get("max");
				}
				set max(b) {
					this.controller.valueController.props.set("max", b);
				}
				get min() {
					return this.controller.valueController.props.get("min");
				}
				set min(b) {
					this.controller.valueController.props.set("min", b);
				}
			}
			const Pe = qa("grl");
			class Qe {
				constructor(f, c) {
					this.onCursorChange_ = this.onCursorChange_.bind(this);
					this.onValueUpdate_ = this.onValueUpdate_.bind(this);
					this.element = f.createElement("div");
					this.element.classList.add(Pe());
					c.viewProps.bindClassModifiers(this.element);
					this.formatter_ = c.formatter;
					this.props_ = c.props;
					this.cursor_ = c.cursor;
					this.cursor_.emitter.on("change", this.onCursorChange_);
					const a = f.createElementNS(ea, "svg");
					a.classList.add(Pe("g"));
					a.style.height = "calc(var(" + jc("containerUnitSize") + ") * " + c.rows + ")";
					this.element.appendChild(a);
					this.svgElem_ = a;
					const b = f.createElementNS(ea, "polyline");
					this.svgElem_.appendChild(b);
					this.lineElem_ = b;
					const d = f.createElement("div");
					d.classList.add(Pe("t"), qa("tt")());
					this.element.appendChild(d);
					this.tooltipElem_ = d;
					c.value.emitter.on("change", this.onValueUpdate_);
					this.value = c.value;
					this.update_();
				}
				get graphElement() {
					return this.svgElem_;
				}
				update_() {
					const {
						clientWidth: h,
						clientHeight: i
					} = this.element;
					const j = this.value.rawValue.length - 1;
					const k = this.props_.get("min");
					const b = this.props_.get("max");
					const c = [];
					this.value.rawValue.forEach((d, e) => {
						if (d === undefined) {
							return;
						}
						const f = E(e, 0, j, 0, h);
						const g = E(d, k, b, i, 0);
						c.push([f, g].join(","));
					});
					this.lineElem_.setAttributeNS(null, "points", c.join(" "));
					const d = this.tooltipElem_;
					const e = this.value.rawValue[this.cursor_.rawValue];
					if (e === undefined) {
						d.classList.remove(Pe("t", "a"));
						return;
					}
					const a = E(this.cursor_.rawValue, 0, j, 0, h);
					const f = E(e, k, b, i, 0);
					d.style.left = a + "px";
					d.style.top = f + "px";
					d.textContent = "" + this.formatter_(e);
					if (!d.classList.contains(Pe("t", "a"))) {
						d.classList.add(Pe("t", "a"), Pe("t", "in"));
						fa(d);
						d.classList.remove(Pe("t", "in"));
					}
				}
				onValueUpdate_() {
					this.update_();
				}
				onCursorChange_() {
					this.update_();
				}
			}
			class Re {
				constructor(b, c) {
					this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this);
					this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this);
					this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this);
					this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this);
					this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this);
					this.props = c.props;
					this.value = c.value;
					this.viewProps = c.viewProps;
					this.cursor_ = sh(-1);
					this.view = new Qe(b, {
						cursor: this.cursor_,
						formatter: c.formatter,
						rows: c.rows,
						props: this.props,
						value: this.value,
						viewProps: this.viewProps
					});
					if (ga(b)) {
						const a = new Zb(this.view.element);
						a.emitter.on("down", this.onGraphPointerDown_);
						a.emitter.on("move", this.onGraphPointerMove_);
						a.emitter.on("up", this.onGraphPointerUp_);
					} else {
						this.view.element.addEventListener("mousemove", this.onGraphMouseMove_);
						this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
					}
				}
				importProps(b) {
					return aa(b, null, b => ({
						max: b.required.number,
						min: b.required.number
					}), b => {
						this.props.set("max", b.max);
						this.props.set("min", b.min);
						return true;
					});
				}
				exportProps() {
					return ba(null, {
						max: this.props.get("max"),
						min: this.props.get("min")
					});
				}
				onGraphMouseLeave_() {
					this.cursor_.rawValue = -1;
				}
				onGraphMouseMove_(c) {
					const {
						clientWidth: a
					} = this.view.element;
					this.cursor_.rawValue = Math.floor(E(c.offsetX, 0, a, 0, this.value.rawValue.length));
				}
				onGraphPointerDown_(a) {
					this.onGraphPointerMove_(a);
				}
				onGraphPointerMove_(b) {
					if (b.data.point) {
						this.cursor_.rawValue = Math.floor(E(b.data.point.x, 0, b.data.bounds.width, 0, this.value.rawValue.length));
					} else {
						this.cursor_.rawValue = -1;
					}
				}
				onGraphPointerUp_() {
					this.cursor_.rawValue = -1;
				}
			}
			function Se(a) {
				if (qh(a.format)) {
					return D(2);
				} else {
					return a.format;
				}
			}
			function Te(a) {
				return a.view === "graph";
			}
			const Ue = Oa({
				id: "monitor-number",
				type: "monitor",
				accept: (b, c) => {
					if (typeof b != "number") {
						return null;
					}
					const a = _(c, a => ({
						format: a.optional.function,
						max: a.optional.number,
						min: a.optional.number,
						readonly: a.required.constant(true),
						rows: a.optional.number,
						view: a.optional.string
					}));
					if (a) {
						return {
							initialValue: b,
							params: a
						};
					} else {
						return null;
					}
				},
				binding: {
					defaultBufferSize: b => Te(b) ? 64 : 1,
					reader: b => B
				},
				controller: b => Te(b.params) ? function (b) {
					return new Re(b.document, {
						formatter: Se(b.params),
						rows: b.params.rows ?? Fe.defaultRows,
						props: th.fromObject({
							max: b.params.max ?? 100,
							min: b.params.min ?? 0
						}),
						value: b.value,
						viewProps: b.viewProps
					});
				}(b) : function (b) {
					if (b.value.rawValue.length === 1) {
						return new Me(b.document, {
							formatter: Se(b.params),
							value: b.value,
							viewProps: b.viewProps
						});
					} else {
						return new Ie(b.document, {
							formatter: Se(b.params),
							rows: b.params.rows ?? Fe.defaultRows,
							value: b.value,
							viewProps: b.viewProps
						});
					}
				}(b),
				api: b => b.controller.valueController instanceof Re ? new Oe(b.controller) : null
			});
			const Ve = Oa({
				id: "monitor-string",
				type: "monitor",
				accept: (a, b) => {
					if (typeof a != "string") {
						return null;
					}
					const c = _(b, a => ({
						multiline: a.optional.boolean,
						readonly: a.required.constant(true),
						rows: a.optional.number
					}));
					if (c) {
						return {
							initialValue: a,
							params: c
						};
					} else {
						return null;
					}
				},
				binding: {
					reader: b => Rb
				},
				controller: a => {
					const b = a.value;
					if (b.rawValue.length > 1 || a.params.multiline) {
						return new Ie(a.document, {
							formatter: Sb,
							rows: a.params.rows ?? Fe.defaultRows,
							value: b,
							viewProps: a.viewProps
						});
					} else {
						return new Me(a.document, {
							formatter: Sb,
							value: b,
							viewProps: a.viewProps
						});
					}
				}
			});
			class We {
				constructor(b) {
					this.target = b.target;
					this.reader_ = b.reader;
					this.writer_ = b.writer;
				}
				read() {
					return this.reader_(this.target.read());
				}
				write(a) {
					this.writer_(this.target, a);
				}
				inject(a) {
					this.write(this.reader_(a));
				}
			}
			class Xe {
				constructor(b) {
					this.target = b.target;
					this.reader_ = b.reader;
				}
				read() {
					return this.reader_(this.target.read());
				}
			}
			function Ye(c, a) {
				if (a === 0) {
					return new wb();
				} else {
					return new xb(c, a ?? Fe.defaultInterval);
				}
			}
			class Ze {
				constructor(b) {
					this.pluginsMap_ = {
						blades: [],
						inputs: [],
						monitors: []
					};
					this.apiCache_ = b;
				}
				getAll() {
					return [...this.pluginsMap_.blades, ...this.pluginsMap_.inputs, ...this.pluginsMap_.monitors];
				}
				register(b, c) {
					if (!(a = c.core) || a.major !== Na.major) {
						throw hh.notCompatible(b, c.id);
					}
					var a;
					if (c.type === "blade") {
						this.pluginsMap_.blades.unshift(c);
					} else if (c.type === "input") {
						this.pluginsMap_.inputs.unshift(c);
					} else if (c.type === "monitor") {
						this.pluginsMap_.monitors.unshift(c);
					}
				}
				createInput_(c, a, f) {
					return this.pluginsMap_.inputs.reduce((e, b) => e ?? function (k, a) {
						const b = k.accept(a.target.read(), a.params);
						if (qh(b)) {
							return null;
						}
						const d = {
							target: a.target,
							initialValue: b.initialValue,
							params: b.params
						};
						const c = _(a.params, a => ({
							disabled: a.optional.boolean,
							hidden: a.optional.boolean,
							label: a.optional.string,
							tag: a.optional.string
						}));
						const e = k.binding.reader(d);
						const f = k.binding.constraint ? k.binding.constraint(d) : undefined;
						const g = new We({
							reader: e,
							target: a.target,
							writer: k.binding.writer(d)
						});
						const h = new X(sh(e(b.initialValue), {
							constraint: f,
							equals: k.binding.equals
						}), g);
						const i = k.controller({
							constraint: f,
							document: a.document,
							initialValue: b.initialValue,
							params: b.params,
							value: h,
							viewProps: hb.create({
								disabled: c == null ? undefined : c.disabled,
								hidden: c == null ? undefined : c.hidden
							})
						});
						return new Aa(a.document, {
							blade: Ya(),
							props: th.fromObject({
								label: "label" in a.params ? (c == null ? undefined : c.label) ?? null : a.target.key
							}),
							tag: c == null ? undefined : c.tag,
							value: h,
							valueController: i
						});
					}(b, {
						document: c,
						target: a,
						params: f
					}), null);
				}
				createMonitor_(c, a, f) {
					return this.pluginsMap_.monitors.reduce((e, b) => e ?? function (j, a) {
						const d = j.accept(a.target.read(), a.params);
						if (qh(d)) {
							return null;
						}
						const e = {
							target: a.target,
							initialValue: d.initialValue,
							params: d.params
						};
						const b = _(a.params, a => ({
							bufferSize: a.optional.number,
							disabled: a.optional.boolean,
							hidden: a.optional.boolean,
							interval: a.optional.number,
							label: a.optional.string
						}));
						const c = j.binding.reader(e);
						const f = (b == null ? undefined : b.bufferSize) ?? (j.binding.defaultBufferSize && j.binding.defaultBufferSize(d.params)) ?? 1;
						const g = new Da({
							binding: new Xe({
								reader: c,
								target: a.target
							}),
							bufferSize: f,
							ticker: Ye(a.document, b == null ? undefined : b.interval)
						});
						const h = j.controller({
							document: a.document,
							params: d.params,
							value: g,
							viewProps: hb.create({
								disabled: b == null ? undefined : b.disabled,
								hidden: b == null ? undefined : b.hidden
							})
						});
						h.viewProps.bindDisabled(g.ticker);
						h.viewProps.handleDispose(() => {
							g.ticker.dispose();
						});
						return new Ea(a.document, {
							blade: Ya(),
							props: th.fromObject({
								label: "label" in a.params ? (b == null ? undefined : b.label) ?? null : a.target.key
							}),
							value: g,
							valueController: h
						});
					}(b, {
						document: c,
						params: f,
						target: a
					}), null);
				}
				createBinding(c, a, d) {
					if (qh(a.read())) {
						throw new hh({
							context: {
								key: a.key
							},
							type: "nomatchingcontroller"
						});
					}
					const e = this.createInput_(c, a, d);
					if (e) {
						return e;
					}
					const f = this.createMonitor_(c, a, d);
					if (f) {
						return f;
					}
					throw new hh({
						context: {
							key: a.key
						},
						type: "nomatchingcontroller"
					});
				}
				createBlade(e, f) {
					const b = this.pluginsMap_.blades.reduce((a, b) => a ?? function (b, d) {
						const a = b.accept(d.params);
						if (!a) {
							return null;
						}
						const c = _(d.params, b => ({
							disabled: b.optional.boolean,
							hidden: b.optional.boolean
						}));
						return b.controller({
							blade: Ya(),
							document: d.document,
							params: Object.assign(Object.assign({}, a.params), {
								disabled: c == null ? undefined : c.disabled,
								hidden: c == null ? undefined : c.hidden
							}),
							viewProps: hb.create({
								disabled: c == null ? undefined : c.disabled,
								hidden: c == null ? undefined : c.hidden
							})
						});
					}(b, {
						document: e,
						params: f
					}), null);
					if (!b) {
						throw new hh({
							type: "nomatchingview",
							context: {
								params: f
							}
						});
					}
					return b;
				}
				createInputBindingApi_(f) {
					const b = this.pluginsMap_.inputs.reduce((a, b) => {
						var d;
						return a || (((d = b.api) === null || d === undefined ? undefined : d.call(b, {
							controller: f
						})) ?? null);
					}, null);
					return this.apiCache_.add(f, b ?? new W(f));
				}
				createMonitorBindingApi_(b) {
					const a = this.pluginsMap_.monitors.reduce((a, c) => {
						var d;
						return a || (((d = c.api) === null || d === undefined ? undefined : d.call(c, {
							controller: b
						})) ?? null);
					}, null);
					return this.apiCache_.add(b, a ?? new W(b));
				}
				createBindingApi(b) {
					if (this.apiCache_.has(b)) {
						return this.apiCache_.get(b);
					}
					if (function (a) {
						return ca(a) && function (a) {
							if (!("binding" in a)) {
								return false;
							}
							const b = a.binding;
							return dh(b) && "read" in b && "write" in b;
						}(a.value);
					}(b)) {
						return this.createInputBindingApi_(b);
					}
					if (function (b) {
						return ca(b) && function (a) {
							if (!("binding" in a)) {
								return false;
							}
							const b = a.binding;
							return dh(b) && "read" in b && !("write" in b);
						}(b.value);
					}(b)) {
						return this.createMonitorBindingApi_(b);
					}
					throw hh.shouldNeverHappen();
				}
				createApi(d) {
					if (this.apiCache_.has(d)) {
						return this.apiCache_.get(d);
					}
					if (function (a) {
						return ca(a) && da(a.value);
					}(d)) {
						return this.createBindingApi(d);
					}
					const a = this.pluginsMap_.blades.reduce((a, b) => a ?? b.api({
						controller: d,
						pool: this
					}), null);
					if (!a) {
						throw hh.shouldNeverHappen();
					}
					return this.apiCache_.add(d, a);
				}
			}
			const $e = new class {
				constructor() {
					this.map_ = new Map();
				}
				get(a) {
					return this.map_.get(a) ?? null;
				}
				has(b) {
					return this.map_.has(b);
				}
				add(b, c) {
					this.map_.set(b, c);
					b.viewProps.handleDispose(() => {
						this.map_.delete(b);
					});
					return c;
				}
			}();
			class _e extends Q {
				constructor(a) {
					super(a);
					this.emitter_ = new g();
					this.controller.value.emitter.on("change", a => {
						this.emitter_.emit("change", new S(this, a.rawValue));
					});
				}
				get label() {
					return this.controller.labelController.props.get("label");
				}
				set label(a) {
					this.controller.labelController.props.set("label", a);
				}
				get options() {
					return this.controller.valueController.props.get("options");
				}
				set options(a) {
					this.controller.valueController.props.set("options", a);
				}
				get value() {
					return this.controller.value.rawValue;
				}
				set value(b) {
					this.controller.value.rawValue = b;
				}
				on(d, a) {
					const b = a.bind(this);
					this.emitter_.on(d, c => {
						b(c);
					}, {
						key: a
					});
					return this;
				}
				off(c, a) {
					this.emitter_.off(c, a);
					return this;
				}
			}
			class af extends Q { }
			class bf extends Q {
				constructor(b) {
					super(b);
					this.emitter_ = new g();
					this.controller.value.emitter.on("change", b => {
						this.emitter_.emit("change", new S(this, b.rawValue));
					});
				}
				get label() {
					return this.controller.labelController.props.get("label");
				}
				set label(b) {
					this.controller.labelController.props.set("label", b);
				}
				get max() {
					return this.controller.valueController.sliderController.props.get("max");
				}
				set max(b) {
					this.controller.valueController.sliderController.props.set("max", b);
				}
				get min() {
					return this.controller.valueController.sliderController.props.get("min");
				}
				set min(b) {
					this.controller.valueController.sliderController.props.set("min", b);
				}
				get value() {
					return this.controller.value.rawValue;
				}
				set value(b) {
					this.controller.value.rawValue = b;
				}
				on(d, a) {
					const b = a.bind(this);
					this.emitter_.on(d, c => {
						b(c);
					}, {
						key: a
					});
					return this;
				}
				off(c, a) {
					this.emitter_.off(c, a);
					return this;
				}
			}
			class cf extends Q {
				constructor(b) {
					super(b);
					this.emitter_ = new g();
					this.controller.value.emitter.on("change", b => {
						this.emitter_.emit("change", new S(this, b.rawValue));
					});
				}
				get label() {
					return this.controller.labelController.props.get("label");
				}
				set label(a) {
					this.controller.labelController.props.set("label", a);
				}
				get formatter() {
					return this.controller.valueController.props.get("formatter");
				}
				set formatter(b) {
					this.controller.valueController.props.set("formatter", b);
				}
				get value() {
					return this.controller.value.rawValue;
				}
				set value(a) {
					this.controller.value.rawValue = a;
				}
				on(d, a) {
					const b = a.bind(this);
					this.emitter_.on(d, c => {
						b(c);
					}, {
						key: a
					});
					return this;
				}
				off(b, c) {
					this.emitter_.off(b, c);
					return this;
				}
			}
			const df = {
				id: "list",
				type: "blade",
				core: Na,
				accept(c) {
					const b = _(c, b => ({
						options: b.required.custom(Bb),
						value: b.required.raw,
						view: b.required.constant("list"),
						label: b.optional.string
					}));
					if (b) {
						return {
							params: b
						};
					} else {
						return null;
					}
				},
				controller(c) {
					const d = new Ab(Cb(c.params.options));
					const e = sh(c.params.value, {
						constraint: d
					});
					const a = new Gb(c.document, {
						props: new th({
							options: d.values.value("options")
						}),
						value: e,
						viewProps: c.viewProps
					});
					return new xa(c.document, {
						blade: c.blade,
						props: th.fromObject({
							label: c.params.label
						}),
						value: e,
						valueController: a
					});
				},
				api: b => b.controller instanceof xa && b.controller.valueController instanceof Gb ? new _e(b.controller) : null
			};
			class ef extends ab {
				constructor(b, c) {
					super(b, c);
				}
				get element() {
					return this.controller.view.element;
				}
			}
			class ff extends db {
				constructor(c, a) {
					super(c, {
						expanded: a.expanded,
						blade: a.blade,
						props: a.props,
						root: true,
						viewProps: a.viewProps
					});
				}
			}
			const gf = qa("spr");
			class hf {
				constructor(b, c) {
					this.element = b.createElement("div");
					this.element.classList.add(gf());
					c.viewProps.bindClassModifiers(this.element);
					const a = b.createElement("hr");
					a.classList.add(gf("r"));
					this.element.appendChild(a);
				}
			}
			class jf extends wa {
				constructor(c, b) {
					super(Object.assign(Object.assign({}, b), {
						view: new hf(c, {
							viewProps: b.viewProps
						})
					}));
				}
			}
			const kf = {
				id: "separator",
				type: "blade",
				core: Na,
				accept(c) {
					const b = _(c, b => ({
						view: b.required.constant("separator")
					}));
					if (b) {
						return {
							params: b
						};
					} else {
						return null;
					}
				},
				controller: b => new jf(b.document, {
					blade: b.blade,
					viewProps: b.viewProps
				}),
				api: b => b.controller instanceof jf ? new af(b.controller) : null
			};
			const lf = {
				id: "slider",
				type: "blade",
				core: Na,
				accept(c) {
					const b = _(c, b => ({
						max: b.required.number,
						min: b.required.number,
						view: b.required.constant("slider"),
						format: b.optional.function,
						label: b.optional.string,
						value: b.optional.number
					}));
					if (b) {
						return {
							params: b
						};
					} else {
						return null;
					}
				},
				controller(d) {
					const e = d.params.value ?? 0;
					const f = new i({
						max: d.params.max,
						min: d.params.min
					});
					const a = sh(e, {
						constraint: f
					});
					const b = new gc(d.document, Object.assign(Object.assign({}, hc({
						formatter: d.params.format ?? C,
						keyScale: sh(1),
						max: f.values.value("max"),
						min: f.values.value("min"),
						pointerScale: K(d.params, e)
					})), {
						parser: z,
						value: a,
						viewProps: d.viewProps
					}));
					return new xa(d.document, {
						blade: d.blade,
						props: th.fromObject({
							label: d.params.label
						}),
						value: a,
						valueController: b
					});
				},
				api: b => b.controller instanceof xa && b.controller.valueController instanceof gc ? new bf(b.controller) : null
			};
			const mf = {
				id: "text",
				type: "blade",
				core: Na,
				accept(c) {
					const b = _(c, b => ({
						parse: b.required.function,
						value: b.required.raw,
						view: b.required.constant("text"),
						format: b.optional.function,
						label: b.optional.string
					}));
					if (b) {
						return {
							params: b
						};
					} else {
						return null;
					}
				},
				controller(b) {
					const c = sh(b.params.value);
					const d = new Mb(b.document, {
						parser: b.params.parse,
						props: th.fromObject({
							formatter: b.params.format ?? (b => String(b))
						}),
						value: c,
						viewProps: b.viewProps
					});
					return new xa(b.document, {
						blade: b.blade,
						props: th.fromObject({
							label: b.params.label
						}),
						value: c,
						valueController: d
					});
				},
				api: b => b.controller instanceof xa && b.controller.valueController instanceof Mb ? new cf(b.controller) : null
			};
			class nf extends ef {
				constructor(b) {
					const c = b ?? {};
					const d = c.document ?? globalThis.document;
					const e = function () {
						const c = new Ze($e);
						[te, ye, De, Ee, ee, $d, Zd, Xd, tc, Ne, Ve, Ue, Pa, eb, ub].forEach(a => {
							c.register("core", a);
						});
						return c;
					}();
					super(new ff(d, {
						expanded: c.expanded,
						blade: Ya(),
						props: th.fromObject({
							title: c.title
						}),
						viewProps: hb.create()
					}), e);
					this.pool_ = e;
					this.containerElem_ = c.container ?? function (c) {
						const a = c.createElement("div");
						a.classList.add(qa("dfw")());
						if (c.body) {
							c.body.appendChild(a);
						}
						return a;
					}(d);
					this.containerElem_.appendChild(this.element);
					this.doc_ = d;
					this.usesDefaultWrapper_ = !c.container;
					this.setUpDefaultPlugins_();
				}
				get document() {
					if (!this.doc_) {
						throw hh.alreadyDisposed();
					}
					return this.doc_;
				}
				dispose() {
					const c = this.containerElem_;
					if (!c) {
						throw hh.alreadyDisposed();
					}
					if (this.usesDefaultWrapper_) {
						const a = c.parentElement;
						if (a) {
							a.removeChild(c);
						}
					}
					this.containerElem_ = null;
					this.doc_ = null;
					super.dispose();
				}
				registerPlugin(c) {
					if (c.css) {
						(function (d, a, c) {
							if (d.querySelector("style[data-tp-style=" + a + "]")) {
								return;
							}
							const e = d.createElement("style");
							e.dataset.tpStyle = a;
							e.textContent = c;
							d.head.appendChild(e);
						})(this.document, "plugin-" + c.id, c.css);
					}
					("plugin" in c ? [c.plugin] : "plugins" in c ? c.plugins : []).forEach(a => {
						this.pool_.register(c.id, a);
					});
				}
				setUpDefaultPlugins_() {
					this.registerPlugin({
						id: "default",
						css: ".tp-tbiv_b,.tp-coltxtv_ms,.tp-colswv_b,.tp-ckbv_i,.tp-sglv_i,.tp-mllv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-rotv_b,.tp-fldv_b,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--bld-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--cnt-usz);line-height:var(--cnt-usz);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tbpv_c>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-vp))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tbpv_c>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--cnt-usp)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tbpv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tbpv_c>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tbpv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tbpv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tbpv_c>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tbpv_c>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--bld-br);border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tbpv_c .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tbpv_c>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tbpv_c>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--bld-br)}.tp-tbpv_c .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--bld-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);overflow:hidden;padding-left:var(--cnt-hp);padding-right:calc(4px + var(--cnt-usz) + var(--cnt-hp));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:\"\";display:block;height:6px;right:calc(var(--cnt-hp) + (var(--cnt-usz) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-vp);padding-top:var(--cnt-vp);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--cnt-usz);line-height:var(--cnt-usz);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-sglv_i,.tp-mllv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--mo-fg);height:var(--cnt-usz);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-sglv_i::-webkit-scrollbar,.tp-mllv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-sglv_i::-webkit-scrollbar-corner,.tp-mllv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-sglv_i::-webkit-scrollbar-thumb,.tp-mllv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-rotv{--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-br: var(--tp-base-border-radius, 6px);--bs-ff: var(--tp-base-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--bld-br: var(--tp-blade-border-radius, 2px);--bld-hp: var(--tp-blade-horizontal-padding, 4px);--bld-vw: var(--tp-blade-value-width, 160px);--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--cnt-hp: var(--tp-container-horizontal-padding, 4px);--cnt-vp: var(--tp-container-vertical-padding, 4px);--cnt-usp: var(--tp-container-unit-spacing, 4px);--cnt-usz: var(--tp-container-unit-size, 20px);--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--bld-br);cursor:pointer;display:block;height:var(--cnt-usz);position:relative;width:var(--cnt-usz)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--cnt-usz)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--cnt-usp);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--cnt-usp)}.tp-colpv_rgb{display:flex;margin-top:var(--cnt-usp);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-vp);padding-top:calc(var(--cnt-vp) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:\"\";height:2px;left:calc(-1*var(--cnt-hp));position:absolute;right:calc(-1*var(--cnt-hp));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--bld-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--cnt-usz)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--bld-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--bld-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{cursor:pointer;display:block;height:var(--cnt-usz);left:0;position:absolute;top:0;width:var(--cnt-usz)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--bld-br);bottom:0;content:\"\";display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--bld-br);color:var(--lbl-fg);cursor:pointer;height:var(--cnt-usz);line-height:var(--cnt-usz);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:\"\";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--cnt-usz)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-hp);padding-right:var(--cnt-hp)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:var(--bld-vw)}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 var(--bld-hp);width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--cnt-usz)*3);line-height:var(--cnt-usz);padding-left:var(--bld-hp);padding-right:var(--bld-hp);resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--cnt-usz);margin-right:4px;position:relative;width:var(--cnt-usz)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--cnt-usp);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-p2dpv{padding-left:calc(var(--cnt-usz) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:var(--bld-vw);padding:var(--cnt-vp) var(--cnt-hp);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--cnt-usz);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:\"\";display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:\"\";display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--bld-br);bottom:0;content:\"\";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:\"\";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--cnt-usz) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:\"\";height:2px;left:0;position:absolute;right:0}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:\"\";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-hp) + 4px);padding-right:calc(var(--cnt-hp) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);bottom:2px;content:\"\";left:0;pointer-events:none;position:absolute;right:0;top:0}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);opacity:.5;overflow:hidden;position:relative;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-tbpv_c{padding-bottom:var(--cnt-vp);padding-left:4px;padding-top:var(--cnt-vp)}.tp-txtv{position:relative}.tp-txtv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:calc(var(--bld-hp) - 5px);position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:\"\";height:calc(var(--cnt-usz) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--bld-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:\"\";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--bs-ff);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--cnt-usz) + var(--cnt-hp));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0;transition-delay:0s;transition-duration:0s}.tp-rotv.tp-rotv-not>.tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst.tp-fldv-expanded>.tp-fldv_b{transition-delay:0s;transition-duration:0s}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}",
						plugins: [df, kf, lf, ub, mf]
					});
				}
			}
			new Ma("4.0.3");
			const of = {
				rE: "2.0.3",
				cy: "MalcomX"
			};
			var pf = dd(555);
			function qf(c) {
				if (c == null) {
					return window;
				}
				if (c.toString() !== "[object Window]") {
					var a = c.ownerDocument;
					return a && a.defaultView || window;
				}
				return c;
			}
			function rf(a) {
				return a instanceof qf(a).Element || a instanceof Element;
			}
			function sf(a) {
				return a instanceof qf(a).HTMLElement || a instanceof HTMLElement;
			}
			function tf(a) {
				return typeof ShadowRoot != "undefined" && (a instanceof qf(a).ShadowRoot || a instanceof ShadowRoot);
			}
			var uf = Math.max;
			var vf = Math.min;
			var wf = Math.round;
			function xf() {
				var b = navigator.userAgentData;
				if (b != null && b.brands && Array.isArray(b.brands)) {
					return b.brands.map(function (b) {
						return b.brand + "/" + b.version;
					}).join(" ");
				} else {
					return navigator.userAgent;
				}
			}
			function yf() {
				return !/^((?!chrome|android).)*safari/i.test(xf());
			}
			function zf(d, c = false, a = false) {
				var b = d.getBoundingClientRect();
				var e = 1;
				var l = 1;
				if (c && sf(d)) {
					e = d.offsetWidth > 0 && wf(b.width) / d.offsetWidth || 1;
					l = d.offsetHeight > 0 && wf(b.height) / d.offsetHeight || 1;
				}
				var m = (rf(d) ? qf(d) : window).visualViewport;
				var h = !yf() && a;
				var k = (b.left + (h && m ? m.offsetLeft : 0)) / e;
				var n = (b.top + (h && m ? m.offsetTop : 0)) / l;
				var o = b.width / e;
				var i = b.height / l;
				return {
					width: o,
					height: i,
					top: n,
					right: k + o,
					bottom: n + i,
					left: k,
					x: k,
					y: n
				};
			}
			function Af(c) {
				var a = qf(c);
				return {
					scrollLeft: a.pageXOffset,
					scrollTop: a.pageYOffset
				};
			}
			function Bf(b) {
				if (b) {
					return (b.nodeName || "").toLowerCase();
				} else {
					return null;
				}
			}
			function Cf(b) {
				return ((rf(b) ? b.ownerDocument : b.document) || unsafeWindow.document).documentElement;
			}
			function Df(b) {
				return zf(Cf(b)).left + Af(b).scrollLeft;
			}
			function Ef(a) {
				return qf(a).getComputedStyle(a);
			}
			function Ff(d) {
				var e = Ef(d);
				var f = e.overflow;
				var a = e.overflowX;
				var b = e.overflowY;
				return /auto|scroll|overlay|hidden/.test(f + b + a);
			}
			function Gf(f, a, b = false) {
				var c;
				var h;
				var m = sf(a);
				var g = sf(a) && function (b) {
					var c = b.getBoundingClientRect();
					var d = wf(c.width) / b.offsetWidth || 1;
					var e = wf(c.height) / b.offsetHeight || 1;
					return d !== 1 || e !== 1;
				}(a);
				var i = Cf(a);
				var k = zf(f, g, b);
				var l = {
					scrollLeft: 0,
					scrollTop: 0
				};
				var o = {
					x: 0,
					y: 0
				};
				if (m || !m && !b) {
					if (Bf(a) !== "body" || Ff(i)) {
						l = (c = a) !== qf(c) && sf(c) ? {
							scrollLeft: (h = c).scrollLeft,
							scrollTop: h.scrollTop
						} : Af(c);
					}
					if (sf(a)) {
						(o = zf(a, true)).x += a.clientLeft;
						o.y += a.clientTop;
					} else if (i) {
						o.x = Df(i);
					}
				}
				return {
					x: k.left + l.scrollLeft - o.x,
					y: k.top + l.scrollTop - o.y,
					width: k.width,
					height: k.height
				};
			}
			function Hf(b) {
				var a = zf(b);
				var c = b.offsetWidth;
				var f = b.offsetHeight;
				if (Math.abs(a.width - c) <= 1) {
					c = a.width;
				}
				if (Math.abs(a.height - f) <= 1) {
					f = a.height;
				}
				return {
					x: b.offsetLeft,
					y: b.offsetTop,
					width: c,
					height: f
				};
			}
			function If(a) {
				if (Bf(a) === "html") {
					return a;
				} else {
					return a.assignedSlot || a.parentNode || (tf(a) ? a.host : null) || Cf(a);
				}
			}
			function Jf(b) {
				if (["html", "body", "#document"].indexOf(Bf(b)) >= 0) {
					return b.ownerDocument.body;
				} else if (sf(b) && Ff(b)) {
					return b;
				} else {
					return Jf(If(b));
				}
			}
			function Kf(b, c) {
				var e;
				if (c === undefined) {
					c = [];
				}
				var j = Jf(b);
				var f = j === ((e = b.ownerDocument) == null ? undefined : e.body);
				var k = qf(j);
				var g = f ? [k].concat(k.visualViewport || [], Ff(j) ? j : []) : j;
				var h = c.concat(g);
				if (f) {
					return h;
				} else {
					return h.concat(Kf(If(g)));
				}
			}
			function Lf(b) {
				return ["table", "td", "th"].indexOf(Bf(b)) >= 0;
			}
			function Mf(b) {
				if (sf(b) && Ef(b).position !== "fixed") {
					return b.offsetParent;
				} else {
					return null;
				}
			}
			function Nf(b) {
				var a = qf(b);
				for (var c = Mf(b); c && Lf(c) && Ef(c).position === "static";) {
					c = Mf(c);
				}
				if (c && (Bf(c) === "html" || Bf(c) === "body" && Ef(c).position === "static")) {
					return a;
				} else {
					return c || function (d) {
						var b = /firefox/i.test(xf());
						if (/Trident/i.test(xf()) && sf(d) && Ef(d).position === "fixed") {
							return null;
						}
						var c = If(d);
						for (tf(c) && (c = c.host); sf(c) && ["html", "body"].indexOf(Bf(c)) < 0;) {
							var f = Ef(c);
							if (f.transform !== "none" || f.perspective !== "none" || f.contain === "paint" || ["transform", "perspective"].indexOf(f.willChange) !== -1 || b && f.willChange === "filter" || b && f.filter && f.filter !== "none") {
								return c;
							}
							c = c.parentNode;
						}
						return null;
					}(b) || a;
				}
			}
			var Of = "top";
			var Pf = "bottom";
			var Qf = "right";
			var Rf = "left";
			var Sf = "auto";
			var Tf = [Of, Pf, Qf, Rf];
			var Uf = "start";
			var Vf = "end";
			var Wf = "viewport";
			var Xf = "popper";
			var Yf = Tf.reduce(function (c, a) {
				return c.concat([a + "-" + Uf, a + "-" + Vf]);
			}, []);
			var Zf = [].concat(Tf, [Sf]).reduce(function (b, c) {
				return b.concat([c, c + "-" + Uf, c + "-" + Vf]);
			}, []);
			var $f = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];
			function _f(d) {
				var f = new Map();
				var h = new Set();
				var a = [];
				function e(b) {
					h.add(b.name);
					[].concat(b.requires || [], b.requiresIfExists || []).forEach(function (b) {
						if (!h.has(b)) {
							var c = f.get(b);
							if (c) {
								e(c);
							}
						}
					});
					a.push(b);
				}
				d.forEach(function (a) {
					f.set(a.name, a);
				});
				d.forEach(function (a) {
					if (!h.has(a.name)) {
						e(a);
					}
				});
				return a;
			}
			var ag = {
				placement: "bottom",
				modifiers: [],
				strategy: "absolute"
			};
			function bg() {
				for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) {
					b[c] = arguments[c];
				}
				return !b.some(function (b) {
					return !b || typeof b.getBoundingClientRect != "function";
				});
			}
			function cg(c = undefined) {
				if (c === undefined) c = {};
				var f = c;
				var g = f.defaultModifiers;
				var i = g === undefined ? [] : g;
				var e = f.defaultOptions;
				var k = e === undefined ? ag : e;
				return function (b, c, e = undefined) {
					if (e === undefined) e = k;
					var f;
					var g;
					var q = {
						placement: "bottom",
						orderedModifiers: [],
						options: Object.assign({}, ag, k),
						modifiersData: {},
						elements: {
							reference: b,
							popper: c
						},
						attributes: {},
						styles: {}
					};
					var m = [];
					var p = false;
					var s = {
						state: q,
						setOptions: function (a) {
							var e = typeof a == "function" ? a(q.options) : a;
							n();
							q.options = Object.assign({}, k, q.options, e);
							q.scrollParents = {
								reference: rf(b) ? Kf(b) : b.contextElement ? Kf(b.contextElement) : [],
								popper: Kf(c)
							};
							var d;
							var f;
							var g = function (c) {
								var a = _f(c);
								return $f.reduce(function (b, c) {
									return b.concat(a.filter(function (b) {
										return b.phase === c;
									}));
								}, []);
							}((d = [].concat(i, q.options.modifiers), f = d.reduce(function (b, d) {
								var a = b[d.name];
								b[d.name] = a ? Object.assign({}, a, d, {
									options: Object.assign({}, a.options, d.options),
									data: Object.assign({}, a.data, d.data)
								}) : d;
								return b;
							}, {}), Object.keys(f).map(function (b) {
								return f[b];
							})));
							q.orderedModifiers = g.filter(function (a) {
								return a.enabled;
							});
							q.orderedModifiers.forEach(function (a) {
								var e = a.name;
								var d = a.options;
								var f = d === undefined ? {} : d;
								var b = a.effect;
								if (typeof b == "function") {
									var c = b({
										state: q,
										name: e,
										instance: s,
										options: f
									});
									m.push(c || function () { });
								}
							});
							return s.update();
						},
						forceUpdate: function () {
							if (!p) {
								var c = q.elements;
								var d = c.reference;
								var e = c.popper;
								if (bg(d, e)) {
									q.rects = {
										reference: Gf(d, Nf(e), q.options.strategy === "fixed"),
										popper: Hf(e)
									};
									q.reset = false;
									q.placement = q.options.placement;
									q.orderedModifiers.forEach(function (a) {
										return q.modifiersData[a.name] = Object.assign({}, a.data);
									});
									for (var a = 0; a < q.orderedModifiers.length; a++) {
										if (q.reset !== true) {
											var g = q.orderedModifiers[a];
											var j = g.fn;
											var l = g.options;
											var m = l === undefined ? {} : l;
											var n = g.name;
											if (typeof j == "function") {
												q = j({
													state: q,
													options: m,
													name: n,
													instance: s
												}) || q;
											}
										} else {
											q.reset = false;
											a = -1;
										}
									}
								}
							}
						},
						update: (f = function () {
							return new Promise(function (a) {
								s.forceUpdate();
								a(q);
							});
						}, function () {
							g ||= new Promise(function (a) {
								Promise.resolve().then(function () {
									g = undefined;
									a(f());
								});
							});
							return g;
						}),
						destroy: function () {
							n();
							p = true;
						}
					};
					if (!bg(b, c)) {
						return s;
					}
					function n() {
						m.forEach(function (b) {
							return b();
						});
						m = [];
					}
					s.setOptions(e).then(function (a) {
						if (!p && e.onFirstUpdate) {
							e.onFirstUpdate(a);
						}
					});
					return s;
				};
			}
			var dg = {
				passive: true
			};
			function eg(a) {
				return a.split("-")[0];
			}
			function fg(a) {
				return a.split("-")[1];
			}
			function gg(a) {
				if (["top", "bottom"].indexOf(a) >= 0) {
					return "x";
				} else {
					return "y";
				}
			}
			function hg(a) {
				var b;
				var j = a.reference;
				var d = a.element;
				var k = a.placement;
				var m = k ? eg(k) : null;
				var l = k ? fg(k) : null;
				var e = j.x + j.width / 2 - d.width / 2;
				var f = j.y + j.height / 2 - d.height / 2;
				switch (m) {
					case Of:
						b = {
							x: e,
							y: j.y - d.height
						};
						break;
					case Pf:
						b = {
							x: e,
							y: j.y + j.height
						};
						break;
					case Qf:
						b = {
							x: j.x + j.width,
							y: f
						};
						break;
					case Rf:
						b = {
							x: j.x - d.width,
							y: f
						};
						break;
					default:
						b = {
							x: j.x,
							y: j.y
						};
				}
				var g = m ? gg(m) : null;
				if (g != null) {
					var h = g === "y" ? "height" : "width";
					switch (l) {
						case Uf:
							b[g] = b[g] - (j[h] / 2 - d[h] / 2);
							break;
						case Vf:
							b[g] = b[g] + (j[h] / 2 - d[h] / 2);
					}
				}
				return b;
			}
			var ig = {
				top: "auto",
				right: "auto",
				bottom: "auto",
				left: "auto"
			};
			function jg(d) {
				var a;
				var o = d.popper;
				var k = d.popperRect;
				var p = d.placement;
				var l = d.variation;
				var c = d.offsets;
				var e = d.position;
				var f = d.gpuAcceleration;
				var g = d.adaptive;
				var h = d.roundOffsets;
				var i = d.isFixed;
				var j = c.x;
				var m = j === undefined ? 0 : j;
				var s = c.y;
				var q = s === undefined ? 0 : s;
				var v = typeof h == "function" ? h({
					x: m,
					y: q
				}) : {
					x: m,
					y: q
				};
				m = v.x;
				q = v.y;
				var u = c.hasOwnProperty("x");
				var t = c.hasOwnProperty("y");
				var w = Rf;
				var z = Of;
				var C = window;
				if (g) {
					var B = Nf(o);
					var F = "clientHeight";
					var I = "clientWidth";
					if (B === qf(o) && Ef(B = Cf(o)).position !== "static" && e === "absolute") {
						F = "scrollHeight";
						I = "scrollWidth";
					}
					if (p === Of || (p === Rf || p === Qf) && l === Vf) {
						z = Pf;
						q -= (i && B === C && C.visualViewport ? C.visualViewport.height : B[F]) - k.height;
						q *= f ? 1 : -1;
					}
					if (p === Rf || (p === Of || p === Pf) && l === Vf) {
						w = Qf;
						m -= (i && B === C && C.visualViewport ? C.visualViewport.width : B[I]) - k.width;
						m *= f ? 1 : -1;
					}
				}
				var J;
				var L = Object.assign({
					position: e
				}, g && ig);
				var H = h === true ? function (d, c) {
					var e = d.x;
					var f = d.y;
					var a = c.devicePixelRatio || 1;
					return {
						x: wf(e * a) / a || 0,
						y: wf(f * a) / a || 0
					};
				}({
					x: m,
					y: q
				}, qf(o)) : {
					x: m,
					y: q
				};
				m = H.x;
				q = H.y;
				if (f) {
					return Object.assign({}, L, ((J = {})[z] = t ? "0" : "", J[w] = u ? "0" : "", J.transform = (C.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + q + "px)" : "translate3d(" + m + "px, " + q + "px, 0)", J));
				} else {
					return Object.assign({}, L, ((a = {})[z] = t ? q + "px" : "", a[w] = u ? m + "px" : "", a.transform = "", a));
				}
			}
			const kg = {
				name: "applyStyles",
				enabled: true,
				phase: "write",
				fn: function (c) {
					var a = c.state;
					Object.keys(a.elements).forEach(function (b) {
						var c = a.styles[b] || {};
						var d = a.attributes[b] || {};
						var e = a.elements[b];
						if (sf(e) && Bf(e)) {
							Object.assign(e.style, c);
							Object.keys(d).forEach(function (c) {
								var b = d[c];
								if (b === false) {
									e.removeAttribute(c);
								} else {
									e.setAttribute(c, b === true ? "" : b);
								}
							});
						}
					});
				},
				effect: function (c) {
					var h = c.state;
					var b = {
						popper: {
							position: h.options.strategy,
							left: "0",
							top: "0",
							margin: "0"
						},
						arrow: {
							position: "absolute"
						},
						reference: {}
					};
					Object.assign(h.elements.popper.style, b.popper);
					h.styles = b;
					if (h.elements.arrow) {
						Object.assign(h.elements.arrow.style, b.arrow);
					}
					return function () {
						Object.keys(h.elements).forEach(function (c) {
							var e = h.elements[c];
							var a = h.attributes[c] || {};
							var f = Object.keys(h.styles.hasOwnProperty(c) ? h.styles[c] : b[c]).reduce(function (b, c) {
								b[c] = "";
								return b;
							}, {});
							if (sf(e) && Bf(e)) {
								Object.assign(e.style, f);
								Object.keys(a).forEach(function (b) {
									e.removeAttribute(b);
								});
							}
						});
					};
				},
				requires: ["computeStyles"]
			};
			var lg = {
				left: "right",
				right: "left",
				bottom: "top",
				top: "bottom"
			};
			function mg(a) {
				return a.replace(/left|right|bottom|top/g, function (b) {
					return lg[b];
				});
			}
			var ng = {
				start: "end",
				end: "start"
			};
			function og(a) {
				return a.replace(/start|end/g, function (b) {
					return ng[b];
				});
			}
			function pg(b, c) {
				var d = c.getRootNode && c.getRootNode();
				if (b.contains(c)) {
					return true;
				}
				if (d && tf(d)) {
					var e = c;
					do {
						if (e && b.isSameNode(e)) {
							return true;
						}
						e = e.parentNode || e.host;
					} while (e);
				}
				return false;
			}
			function qg(b) {
				return Object.assign({}, b, {
					left: b.x,
					top: b.y,
					right: b.x + b.width,
					bottom: b.y + b.height
				});
			}
			function rg(b, a, c) {
				if (a === Wf) {
					return qg(function (f, c) {
						var a = qf(f);
						var g = Cf(f);
						var b = a.visualViewport;
						var d = g.clientWidth;
						var i = g.clientHeight;
						var j = 0;
						var n = 0;
						if (b) {
							d = b.width;
							i = b.height;
							var o = yf();
							if (o || !o && c === "fixed") {
								j = b.offsetLeft;
								n = b.offsetTop;
							}
						}
						return {
							width: d,
							height: i,
							x: j + Df(f),
							y: n
						};
					}(b, c));
				} else if (rf(a)) {
					return function (c, b) {
						var a = zf(c, false, b === "fixed");
						a.top = a.top + c.clientTop;
						a.left = a.left + c.clientLeft;
						a.bottom = a.top + c.clientHeight;
						a.right = a.left + c.clientWidth;
						a.width = c.clientWidth;
						a.height = c.clientHeight;
						a.x = a.left;
						a.y = a.top;
						return a;
					}(a, c);
				} else {
					return qg(function (a) {
						var b;
						var i = Cf(a);
						var d = Af(a);
						var e = (b = a.ownerDocument) == null ? undefined : b.body;
						var j = uf(i.scrollWidth, i.clientWidth, e ? e.scrollWidth : 0, e ? e.clientWidth : 0);
						var f = uf(i.scrollHeight, i.clientHeight, e ? e.scrollHeight : 0, e ? e.clientHeight : 0);
						var g = -d.scrollLeft + Df(a);
						var l = -d.scrollTop;
						if (Ef(e || i).direction === "rtl") {
							g += uf(i.clientWidth, e ? e.clientWidth : 0) - j;
						}
						return {
							width: j,
							height: f,
							x: g,
							y: l
						};
					}(Cf(b)));
				}
			}
			function sg(a) {
				return Object.assign({}, {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}, a);
			}
			function tg(d, a) {
				return a.reduce(function (a, b) {
					a[b] = d;
					return a;
				}, {});
			}
			function ug(b, c = undefined) {
				if (c === undefined) c = {};
				var E = c;
				var g = E.placement;
				var h = g === undefined ? b.placement : g;
				var d = E.strategy;
				var e = d === undefined ? b.strategy : d;
				var f = E.boundary;
				var i = f === undefined ? "clippingParents" : f;
				var j = E.rootBoundary;
				var k = j === undefined ? Wf : j;
				var l = E.elementContext;
				var m = l === undefined ? Xf : l;
				var n = E.altBoundary;
				var o = n !== undefined && n;
				var p = E.padding;
				var q = p === undefined ? 0 : p;
				var r = sg(typeof q != "number" ? q : tg(q, Tf));
				var s = m === Xf ? "reference" : Xf;
				var t = b.rects.popper;
				var u = b.elements[o ? s : m];
				var v = function (e, f, g, h) {
					var i = f === "clippingParents" ? function (a) {
						var c = Kf(If(a));
						var b = ["absolute", "fixed"].indexOf(Ef(a).position) >= 0 && sf(a) ? Nf(a) : a;
						if (rf(b)) {
							return c.filter(function (c) {
								return rf(c) && pg(c, b) && Bf(c) !== "body";
							});
						} else {
							return [];
						}
					}(e) : [].concat(f);
					var d = [].concat(i, [g]);
					var a = d[0];
					var b = d.reduce(function (d, a) {
						var b = rg(e, a, h);
						d.top = uf(b.top, d.top);
						d.right = vf(b.right, d.right);
						d.bottom = vf(b.bottom, d.bottom);
						d.left = uf(b.left, d.left);
						return d;
					}, rg(e, a, h));
					b.width = b.right - b.left;
					b.height = b.bottom - b.top;
					b.x = b.left;
					b.y = b.top;
					return b;
				}(rf(u) ? u : u.contextElement || Cf(b.elements.popper), i, k, e);
				var w = zf(b.elements.reference);
				var x = hg({
					reference: w,
					element: t,
					strategy: "absolute",
					placement: h
				});
				var y = qg(Object.assign({}, t, x));
				var z = m === Xf ? y : w;
				var A = {
					top: v.top - z.top + r.top,
					bottom: z.bottom - v.bottom + r.bottom,
					left: v.left - z.left + r.left,
					right: z.right - v.right + r.right
				};
				var B = b.modifiersData.offset;
				if (m === Xf && B) {
					var C = B[h];
					Object.keys(A).forEach(function (b) {
						var c = [Qf, Pf].indexOf(b) >= 0 ? 1 : -1;
						var d = [Of, Pf].indexOf(b) >= 0 ? "y" : "x";
						A[b] += C[d] * c;
					});
				}
				return A;
			}
			function vg(d, a, b) {
				return uf(d, vf(a, b));
			}
			function wg(d, a, b = undefined) {
				if (b === undefined) b = {
					x: 0,
					y: 0
				};
				return {
					top: d.top - a.height - b.y,
					right: d.right - a.width + b.x,
					bottom: d.bottom - a.height + b.y,
					left: d.left - a.width - b.x
				};
			}
			function xg(b) {
				return [Of, Qf, Pf, Rf].some(function (c) {
					return b[c] >= 0;
				});
			}
			var yg = cg({
				defaultModifiers: [{
					name: "eventListeners",
					enabled: true,
					phase: "write",
					fn: function () { },
					effect: function (h) {
						var e = h.state;
						var g = h.instance;
						var i = h.options;
						var j = i.scroll;
						var b = j === undefined || j;
						var a = i.resize;
						var c = a === undefined || a;
						var d = qf(e.elements.popper);
						var k = [].concat(e.scrollParents.reference, e.scrollParents.popper);
						if (b) {
							k.forEach(function (b) {
								b.addEventListener("scroll", g.update, dg);
							});
						}
						if (c) {
							d.addEventListener("resize", g.update, dg);
						}
						return function () {
							if (b) {
								k.forEach(function (b) {
									b.removeEventListener("scroll", g.update, dg);
								});
							}
							if (c) {
								d.removeEventListener("resize", g.update, dg);
							}
						};
					},
					data: {}
				}, {
					name: "popperOffsets",
					enabled: true,
					phase: "read",
					fn: function (b) {
						var c = b.state;
						var d = b.name;
						c.modifiersData[d] = hg({
							reference: c.rects.reference,
							element: c.rects.popper,
							strategy: "absolute",
							placement: c.placement
						});
					},
					data: {}
				}, {
					name: "computeStyles",
					enabled: true,
					phase: "beforeWrite",
					fn: function (i) {
						var j = i.state;
						var k = i.options;
						var a = k.gpuAcceleration;
						var b = a === undefined || a;
						var c = k.adaptive;
						var d = c === undefined || c;
						var e = k.roundOffsets;
						var f = e === undefined || e;
						var g = {
							placement: eg(j.placement),
							variation: fg(j.placement),
							popper: j.elements.popper,
							popperRect: j.rects.popper,
							gpuAcceleration: b,
							isFixed: j.options.strategy === "fixed"
						};
						if (j.modifiersData.popperOffsets != null) {
							j.styles.popper = Object.assign({}, j.styles.popper, jg(Object.assign({}, g, {
								offsets: j.modifiersData.popperOffsets,
								position: j.options.strategy,
								adaptive: d,
								roundOffsets: f
							})));
						}
						if (j.modifiersData.arrow != null) {
							j.styles.arrow = Object.assign({}, j.styles.arrow, jg(Object.assign({}, g, {
								offsets: j.modifiersData.arrow,
								position: "absolute",
								adaptive: false,
								roundOffsets: f
							})));
						}
						j.attributes.popper = Object.assign({}, j.attributes.popper, {
							"data-popper-placement": j.placement
						});
					},
					data: {}
				}, kg, {
					name: "offset",
					enabled: true,
					phase: "main",
					requires: ["popperOffsets"],
					fn: function (h) {
						var i = h.state;
						var c = h.options;
						var j = h.name;
						var f = c.offset;
						var l = f === undefined ? [0, 0] : f;
						var a = Zf.reduce(function (c, a) {
							c[a] = function (g, a, b) {
								var h = eg(g);
								var c = [Rf, Of].indexOf(h) >= 0 ? -1 : 1;
								var d = typeof b == "function" ? b(Object.assign({}, a, {
									placement: g
								})) : b;
								var e = d[0];
								var j = d[1];
								e = e || 0;
								j = (j || 0) * c;
								if ([Rf, Qf].indexOf(h) >= 0) {
									return {
										x: j,
										y: e
									};
								} else {
									return {
										x: e,
										y: j
									};
								}
							}(a, i.rects, l);
							return c;
						}, {});
						var b = a[i.placement];
						var d = b.x;
						var e = b.y;
						if (i.modifiersData.popperOffsets != null) {
							i.modifiersData.popperOffsets.x += d;
							i.modifiersData.popperOffsets.y += e;
						}
						i.modifiersData[j] = a;
					}
				}, {
					name: "flip",
					enabled: true,
					phase: "main",
					fn: function (x) {
						var e = x.state;
						var y = x.options;
						var f = x.name;
						if (!e.modifiersData[f]._skip) {
							var k = y.mainAxis;
							var c = k === undefined || k;
							var a = y.altAxis;
							var b = a === undefined || a;
							var d = y.fallbackPlacements;
							var g = y.padding;
							var h = y.boundary;
							var i = y.rootBoundary;
							var j = y.altBoundary;
							var l = y.flipVariations;
							var m = l === undefined || l;
							var n = y.allowedAutoPlacements;
							var o = e.options.placement;
							var p = eg(o);
							var q = d || (p !== o && m ? function (b) {
								if (eg(b) === Sf) {
									return [];
								}
								var c = mg(b);
								return [og(b), c, og(c)];
							}(o) : [mg(o)]);
							for (var r = [o].concat(q).reduce(function (b, c) {
								return b.concat(eg(c) === Sf ? function (n, a = undefined) {
									if (a === undefined) a = {};
									var o = a;
									var f = o.placement;
									var c = o.boundary;
									var d = o.rootBoundary;
									var e = o.padding;
									var g = o.flipVariations;
									var h = o.allowedAutoPlacements;
									var i = h === undefined ? Zf : h;
									var j = fg(f);
									var k = j ? g ? Yf : Yf.filter(function (b) {
										return fg(b) === j;
									}) : Tf;
									var l = k.filter(function (a) {
										return i.indexOf(a) >= 0;
									});
									if (l.length === 0) {
										l = k;
									}
									var q = l.reduce(function (f, a) {
										f[a] = ug(n, {
											placement: a,
											boundary: c,
											rootBoundary: d,
											padding: e
										})[eg(a)];
										return f;
									}, {});
									return Object.keys(q).sort(function (b, c) {
										return q[b] - q[c];
									});
								}(e, {
									placement: c,
									boundary: h,
									rootBoundary: i,
									padding: g,
									flipVariations: m,
									allowedAutoPlacements: n
								}) : c);
							}, []), s = e.rects.reference, t = e.rects.popper, u = new Map(), v = true, B = r[0], C = 0; C < r.length; C++) {
								var D = r[C];
								var E = eg(D);
								var P = fg(D) === Uf;
								var Q = [Of, Pf].indexOf(E) >= 0;
								var S = Q ? "width" : "height";
								var T = ug(e, {
									placement: D,
									boundary: h,
									rootBoundary: i,
									altBoundary: j,
									padding: g
								});
								var U = Q ? P ? Qf : Rf : P ? Pf : Of;
								if (s[S] > t[S]) {
									U = mg(U);
								}
								var V = mg(U);
								var W = [];
								if (c) {
									W.push(T[E] <= 0);
								}
								if (b) {
									W.push(T[U] <= 0, T[V] <= 0);
								}
								if (W.every(function (b) {
									return b;
								})) {
									B = D;
									v = false;
									break;
								}
								u.set(D, W);
							}
							if (v) {
								for (var X = function (a) {
									var c = r.find(function (c) {
										var d = u.get(c);
										if (d) {
											return d.slice(0, a).every(function (b) {
												return b;
											});
										}
									});
									if (c) {
										B = c;
										return "break";
									}
								}, O = m ? 3 : 1; O > 0 && X(O) !== "break"; O--);
							}
							if (e.placement !== B) {
								e.modifiersData[f]._skip = true;
								e.placement = B;
								e.reset = true;
							}
						}
					},
					requiresIfExists: ["offset"],
					data: {
						_skip: false
					}
				}, {
					name: "preventOverflow",
					enabled: true,
					phase: "main",
					fn: function (ia) {
						var a = ia.state;
						var b = ia.options;
						var c = ia.name;
						var d = b.mainAxis;
						var e = d === undefined || d;
						var f = b.altAxis;
						var g = f !== undefined && f;
						var h = b.boundary;
						var i = b.rootBoundary;
						var j = b.altBoundary;
						var k = b.padding;
						var l = b.tether;
						var m = l === undefined || l;
						var n = b.tetherOffset;
						var o = n === undefined ? 0 : n;
						var p = ug(a, {
							boundary: h,
							rootBoundary: i,
							padding: k,
							altBoundary: j
						});
						var q = eg(a.placement);
						var r = fg(a.placement);
						var s = !r;
						var t = gg(q);
						var u = t === "x" ? "y" : "x";
						var v = a.modifiersData.popperOffsets;
						var w = a.rects.reference;
						var x = a.rects.popper;
						var y = typeof o == "function" ? o(Object.assign({}, a.rects, {
							placement: a.placement
						})) : o;
						var z = typeof y == "number" ? {
							mainAxis: y,
							altAxis: y
						} : Object.assign({
							mainAxis: 0,
							altAxis: 0
						}, y);
						var A = a.modifiersData.offset ? a.modifiersData.offset[a.placement] : null;
						var B = {
							x: 0,
							y: 0
						};
						if (v) {
							if (e) {
								var C = t === "y" ? Of : Rf;
								var D = t === "y" ? Pf : Qf;
								var E = t === "y" ? "height" : "width";
								var F = v[t];
								var G = F + p[C];
								var H = F - p[D];
								var I = m ? -x[E] / 2 : 0;
								var J = r === Uf ? w[E] : x[E];
								var K = r === Uf ? -x[E] : -w[E];
								var L = a.elements.arrow;
								var M = m && L ? Hf(L) : {
									width: 0,
									height: 0
								};
								var N = a.modifiersData["arrow#persistent"] ? a.modifiersData["arrow#persistent"].padding : {
									top: 0,
									right: 0,
									bottom: 0,
									left: 0
								};
								var O = N[C];
								var P = N[D];
								var Q = vg(0, w[E], M[E]);
								var R = s ? w[E] / 2 - I - Q - O - z.mainAxis : J - Q - O - z.mainAxis;
								var S = s ? -w[E] / 2 + I + Q + P + z.mainAxis : K + Q + P + z.mainAxis;
								var T = a.elements.arrow && Nf(a.elements.arrow);
								var U = T ? t === "y" ? T.clientTop || 0 : T.clientLeft || 0 : 0;
								var V = (A == null ? undefined : A[t]) ?? 0;
								var W = F + S - V;
								var X = vg(m ? vf(G, F + R - V - U) : G, F, m ? uf(H, W) : H);
								v[t] = X;
								B[t] = X - F;
							}
							if (g) {
								var Y = t === "x" ? Of : Rf;
								var Z = t === "x" ? Pf : Qf;
								var $ = v[u];
								var _ = u === "y" ? "height" : "width";
								var aa = $ + p[Y];
								var ba = $ - p[Z];
								var ca = [Of, Rf].indexOf(q) !== -1;
								var da = (A == null ? undefined : A[u]) ?? 0;
								var ea = ca ? aa : $ - w[_] - x[_] - da + z.altAxis;
								var fa = ca ? $ + w[_] + x[_] - da - z.altAxis : ba;
								var ga = m && ca ? function (a, b, c) {
									var d = vg(a, b, c);
									if (d > c) {
										return c;
									} else {
										return d;
									}
								}(ea, $, fa) : vg(m ? ea : aa, $, m ? fa : ba);
								v[u] = ga;
								B[u] = ga - $;
							}
							a.modifiersData[c] = B;
						}
					},
					requiresIfExists: ["offset"]
				}, {
					name: "arrow",
					enabled: true,
					phase: "main",
					fn: function (a) {
						var c;
						var y = a.state;
						var z = a.name;
						var k = a.options;
						var e = y.elements.arrow;
						var d = y.modifiersData.popperOffsets;
						var f = eg(y.placement);
						var g = gg(f);
						var h = [Rf, Qf].indexOf(f) >= 0 ? "height" : "width";
						if (e && d) {
							var i = function (c, d) {
								return sg(typeof (c = typeof c == "function" ? c(Object.assign({}, d.rects, {
									placement: d.placement
								})) : c) != "number" ? c : tg(c, Tf));
							}(k.padding, y);
							var j = Hf(e);
							var l = g === "y" ? Of : Rf;
							var m = g === "y" ? Pf : Qf;
							var n = y.rects.reference[h] + y.rects.reference[g] - d[g] - y.rects.popper[h];
							var o = d[g] - y.rects.reference[g];
							var p = Nf(e);
							var q = p ? g === "y" ? p.clientHeight || 0 : p.clientWidth || 0 : 0;
							var r = n / 2 - o / 2;
							var s = i[l];
							var t = q - j[h] - i[m];
							var u = q / 2 - j[h] / 2 + r;
							var v = vg(s, u, t);
							var w = g;
							y.modifiersData[z] = ((c = {})[w] = v, c.centerOffset = v - u, c);
						}
					},
					effect: function (c) {
						var d = c.state;
						var e = c.options.element;
						var a = e === undefined ? "[data-popper-arrow]" : e;
						if (a != null && (typeof a != "string" || (a = d.elements.popper.querySelector(a))) && pg(d.elements.popper, a)) {
							d.elements.arrow = a;
						}
					},
					requires: ["popperOffsets"],
					requiresIfExists: ["preventOverflow"]
				}, {
					name: "hide",
					enabled: true,
					phase: "main",
					requiresIfExists: ["preventOverflow"],
					fn: function (l) {
						var m = l.state;
						var k = l.name;
						var a = m.rects.reference;
						var b = m.rects.popper;
						var c = m.modifiersData.preventOverflow;
						var d = ug(m, {
							elementContext: "reference"
						});
						var e = ug(m, {
							altBoundary: true
						});
						var f = wg(d, a);
						var g = wg(e, b, c);
						var h = xg(f);
						var i = xg(g);
						m.modifiersData[k] = {
							referenceClippingOffsets: f,
							popperEscapeOffsets: g,
							isReferenceHidden: h,
							hasPopperEscaped: i
						};
						m.attributes.popper = Object.assign({}, m.attributes.popper, {
							"data-popper-reference-hidden": h,
							"data-popper-escaped": i
						});
					}
				}]
			});
			var zg = "tippy-content";
			var Ag = "tippy-backdrop";
			var Bg = "tippy-arrow";
			var Cg = "tippy-svg-arrow";
			var Dg = {
				passive: true,
				capture: true
			};
			function Eg() {
				return document.body;
			}
			function Fg(b, a, c) {
				if (Array.isArray(b)) {
					var d = b[a];
					if (d == null) {
						if (Array.isArray(c)) {
							return c[a];
						} else {
							return c;
						}
					} else {
						return d;
					}
				}
				return b;
			}
			function Gg(b, c) {
				var a = {}.toString.call(b);
				return a.indexOf("[object") === 0 && a.indexOf(c + "]") > -1;
			}
			function Hg(c, b) {
				if (typeof c == "function") {
					return c.apply(undefined, b);
				} else {
					return c;
				}
			}
			function Ig(a, b) {
				if (b === 0) {
					return a;
				} else {
					return function (d) {
						clearTimeout(c);
						c = setTimeout(function () {
							a(d);
						}, b);
					};
				}
				var c;
			}
			function Jg(a) {
				return [].concat(a);
			}
			function Kg(c, b) {
				if (c.indexOf(b) === -1) {
					c.push(b);
				}
			}
			function Lg(a) {
				return [].slice.call(a);
			}
			function Mg(d) {
				return Object.keys(d).reduce(function (a, b) {
					if (d[b] !== undefined) {
						a[b] = d[b];
					}
					return a;
				}, {});
			}
			function Ng() {
				return document.createElement("div");
			}
			function Og(b) {
				return ["Element", "Fragment"].some(function (c) {
					return Gg(b, c);
				});
			}
			function Pg(a, d) {
				a.forEach(function (a) {
					if (a) {
						a.style.transitionDuration = d + "ms";
					}
				});
			}
			function Qg(a, c) {
				a.forEach(function (b) {
					if (b) {
						b.setAttribute("data-state", c);
					}
				});
			}
			function Rg(c, b, f) {
				var d = b + "EventListener";
				["transitionend", "webkitTransitionEnd"].forEach(function (b) {
					c[d](b, f);
				});
			}
			function Sg(a, b) {
				for (var c = b; c;) {
					var f;
					if (a.contains(c)) {
						return true;
					}
					c = c.getRootNode == null || (f = c.getRootNode()) == null ? undefined : f.host;
				}
				return false;
			}
			var Tg = {
				isTouch: false
			};
			var Ug = 0;
			function Vg() {
				if (!Tg.isTouch) {
					Tg.isTouch = true;
					if (unsafeWindow.performance) {
						document.addEventListener("mousemove", Xg);
					}
				}
			}
			function Xg() {
				var b = performance.now();
				if (b - Ug < 20) {
					Tg.isTouch = false;
					document.removeEventListener("mousemove", Xg);
				}
				Ug = b;
			}
			function Yg() {
				var b;
				var e = document.activeElement;
				if ((b = e) && b._tippy && b._tippy.reference === b) {
					var d = e._tippy;
					if (e.blur && !d.state.isVisible) {
						e.blur();
					}
				}
			}
			var $g = typeof window != "undefined" && typeof document != "undefined" && !!unsafeWindow.msCrypto;
			var _g = Object.assign({
				appendTo: Eg,
				aria: {
					content: "auto",
					expanded: "auto"
				},
				delay: 0,
				duration: [300, 250],
				getReferenceClientRect: null,
				hideOnClick: true,
				ignoreAttributes: false,
				interactive: false,
				interactiveBorder: 2,
				interactiveDebounce: 0,
				moveTransition: "",
				offset: [0, 10],
				onAfterUpdate: function () { },
				onBeforeUpdate: function () { },
				onCreate: function () { },
				onDestroy: function () { },
				onHidden: function () { },
				onHide: function () { },
				onMount: function () { },
				onShow: function () { },
				onShown: function () { },
				onTrigger: function () { },
				onUntrigger: function () { },
				onClickOutside: function () { },
				placement: "top",
				plugins: [],
				popperOptions: {},
				render: null,
				showOnCreate: false,
				touch: true,
				trigger: "mouseenter focus",
				triggerTarget: null
			}, {
				animateFill: false,
				followCursor: false,
				inlinePositioning: false,
				sticky: false
			}, {
				allowHTML: false,
				animation: "fade",
				arrow: true,
				content: "",
				inertia: false,
				maxWidth: 350,
				role: "tooltip",
				theme: "",
				zIndex: 9999
			});
			var ah = Object.keys(_g);
			function ch(c) {
				var a = (c.plugins || []).reduce(function (a, b) {
					var f = b.name;
					var d = b.defaultValue;
					if (f) {
						a[f] = c[f] !== undefined ? c[f] : _g[f] ?? d;
					}
					return a;
				}, {});
				return Object.assign({}, c, a);
			}
			function eh(c, a) {
				var d = Object.assign({}, a, {
					content: Hg(a.content, [c])
				}, a.ignoreAttributes ? {} : function (e, a) {
					return (a ? Object.keys(ch(Object.assign({}, _g, {
						plugins: a
					}))) : ah).reduce(function (b, a) {
						var c = (e.getAttribute("data-tippy-" + a) || "").trim();
						if (!c) {
							return b;
						}
						if (a === "content") {
							b[a] = c;
						} else {
							try {
								b[a] = JSON.parse(c);
							} catch (d) {
								b[a] = c;
							}
						}
						return b;
					}, {});
				}(c, a.plugins));
				d.aria = Object.assign({}, _g.aria, d.aria);
				d.aria = {
					expanded: d.aria.expanded === "auto" ? a.interactive : d.aria.expanded,
					content: d.aria.content === "auto" ? a.interactive ? null : "describedby" : d.aria.content
				};
				return d;
			}
			function fh() {
				return "innerHTML";
			}
			function gh(b, c) {
				b[fh()] = c;
			}
			function ih(c) {
				var a = Ng();
				if (c === true) {
					a.className = Bg;
				} else {
					a.className = Cg;
					if (Og(c)) {
						a.appendChild(c);
					} else {
						gh(a, c);
					}
				}
				return a;
			}
			function jh(c, a) {
				if (Og(a.content)) {
					gh(c, "");
					c.appendChild(a.content);
				} else if (typeof a.content != "function") {
					if (a.allowHTML) {
						gh(c, a.content);
					} else {
						c.textContent = a.content;
					}
				}
			}
			function kh(a) {
				var b = a.firstElementChild;
				var c = Lg(b.children);
				return {
					box: b,
					content: c.find(function (a) {
						return a.classList.contains(zg);
					}),
					arrow: c.find(function (b) {
						return b.classList.contains(Bg) || b.classList.contains(Cg);
					}),
					backdrop: c.find(function (a) {
						return a.classList.contains(Ag);
					})
				};
			}
			function lh(f) {
				var c = Ng();
				var d = Ng();
				d.className = "tippy-box";
				d.setAttribute("data-state", "hidden");
				d.setAttribute("tabindex", "-1");
				var a = Ng();
				function b(d, a) {
					var b = kh(c);
					var e = b.box;
					var i = b.content;
					var g = b.arrow;
					if (a.theme) {
						e.setAttribute("data-theme", a.theme);
					} else {
						e.removeAttribute("data-theme");
					}
					if (typeof a.animation == "string") {
						e.setAttribute("data-animation", a.animation);
					} else {
						e.removeAttribute("data-animation");
					}
					if (a.inertia) {
						e.setAttribute("data-inertia", "");
					} else {
						e.removeAttribute("data-inertia");
					}
					e.style.maxWidth = typeof a.maxWidth == "number" ? a.maxWidth + "px" : a.maxWidth;
					if (a.role) {
						e.setAttribute("role", a.role);
					} else {
						e.removeAttribute("role");
					}
					if (d.content !== a.content || d.allowHTML !== a.allowHTML) {
						jh(i, f.props);
					}
					if (a.arrow) {
						if (g) {
							if (d.arrow !== a.arrow) {
								e.removeChild(g);
								e.appendChild(ih(a.arrow));
							}
						} else {
							e.appendChild(ih(a.arrow));
						}
					} else if (g) {
						e.removeChild(g);
					}
				}
				a.className = zg;
				a.setAttribute("data-state", "hidden");
				jh(a, f.props);
				c.appendChild(d);
				d.appendChild(a);
				b(f.props, f.props);
				return {
					popper: c,
					onUpdate: b
				};
			}
			lh.$$tippy = true;
			var mh = 1;
			var oh = [];
			var uh = [];
			function Ah(j, c) {
				var d;
				var e;
				var a;
				var f;
				var h;
				var l;
				var i;
				var p;
				var u = eh(j, Object.assign({}, _g, ch(Mg(c))));
				var t = false;
				var w = false;
				var la = false;
				var na = false;
				var oa = [];
				var pa = Ig(ba, u.interactiveDebounce);
				var qa = mh++;
				var G = (p = u.plugins).filter(function (c, a) {
					return p.indexOf(c) === a;
				});
				var ma = {
					id: qa,
					reference: j,
					popper: Ng(),
					popperInstance: null,
					props: u,
					state: {
						isEnabled: true,
						isVisible: false,
						isDestroyed: false,
						isMounted: false,
						isShown: false
					},
					plugins: G,
					clearDelayTimeouts: function () {
						clearTimeout(d);
						clearTimeout(e);
						cancelAnimationFrame(a);
					},
					setProps: function (a) {
						if (!ma.state.isDestroyed) {
							P("onBeforeUpdate", [ma, a]);
							_();
							var b = ma.props;
							var c = eh(j, Object.assign({}, b, Mg(a), {
								ignoreAttributes: true
							}));
							ma.props = c;
							$();
							if (b.interactiveDebounce !== c.interactiveDebounce) {
								S();
								pa = Ig(ba, c.interactiveDebounce);
							}
							if (b.triggerTarget && !c.triggerTarget) {
								Jg(b.triggerTarget).forEach(function (a) {
									a.removeAttribute("aria-expanded");
								});
							} else if (c.triggerTarget) {
								j.removeAttribute("aria-expanded");
							}
							R();
							O();
							if (B) {
								B(b, c);
							}
							if (ma.popperInstance) {
								fa();
								ha().forEach(function (b) {
									requestAnimationFrame(b._tippy.popperInstance.forceUpdate);
								});
							}
							P("onAfterUpdate", [ma, a]);
						}
					},
					setContent: function (a) {
						ma.setProps({
							content: a
						});
					},
					show: function () {
						var h = ma.state.isVisible;
						var c = ma.state.isDestroyed;
						var f = !ma.state.isEnabled;
						var b = Tg.isTouch && !ma.props.touch;
						var a = Fg(ma.props.duration, 0, _g.duration);
						if (!h && !c && !f && !b && !J().hasAttribute("disabled") && !(P("onShow", [ma], false), ma.props.onShow(ma) === false)) {
							ma.state.isVisible = true;
							if (I()) {
								N.style.visibility = "visible";
							}
							O();
							W();
							if (!ma.state.isMounted) {
								N.style.transition = "none";
							}
							if (I()) {
								var d = L();
								Pg([d.box, d.content], 0);
							}
							var e;
							var k;
							var m;
							l = function () {
								var d;
								if (ma.state.isVisible && !na) {
									na = true;
									N.offsetHeight;
									N.style.transition = ma.props.moveTransition;
									if (I() && ma.props.animation) {
										var g = L();
										var c = g.box;
										var e = g.content;
										Pg([c, e], a);
										Qg([c, e], "visible");
									}
									Q();
									R();
									Kg(uh, ma);
									if ((d = ma.popperInstance) != null) {
										d.forceUpdate();
									}
									P("onMount", [ma]);
									if (ma.props.animation && I()) {
										(function (b, c) {
											Y(b, function () {
												ma.state.isShown = true;
												P("onShown", [ma]);
											});
										})(a);
									}
								}
							};
							k = ma.props.appendTo;
							m = J();
							if (!(e = ma.props.interactive && k === Eg || k === "parent" ? m.parentNode : Hg(k, [m])).contains(N)) {
								e.appendChild(N);
							}
							ma.state.isMounted = true;
							fa();
						}
					},
					hide: function () {
						var h = !ma.state.isVisible;
						var b = ma.state.isDestroyed;
						var c = !ma.state.isEnabled;
						var a = Fg(ma.props.duration, 1, _g.duration);
						if (!h && !b && !c && (P("onHide", [ma], false), ma.props.onHide(ma) !== false)) {
							ma.state.isVisible = false;
							ma.state.isShown = false;
							na = false;
							t = false;
							if (I()) {
								N.style.visibility = "hidden";
							}
							S();
							X();
							O(true);
							if (I()) {
								var d = L();
								var e = d.box;
								var f = d.content;
								if (ma.props.animation) {
									Pg([e, f], a);
									Qg([e, f], "hidden");
								}
							}
							Q();
							R();
							if (ma.props.animation) {
								if (I()) {
									(function (b, c) {
										Y(b, function () {
											if (!ma.state.isVisible && N.parentNode && N.parentNode.contains(N)) {
												c();
											}
										});
									})(a, ma.unmount);
								}
							} else {
								ma.unmount();
							}
						}
					},
					hideWithInteractivity: function (a) {
						K().addEventListener("mousemove", pa);
						Kg(oh, pa);
						pa(a);
					},
					enable: function () {
						ma.state.isEnabled = true;
					},
					disable: function () {
						ma.hide();
						ma.state.isEnabled = false;
					},
					unmount: function () {
						if (ma.state.isVisible) {
							ma.hide();
						}
						if (ma.state.isMounted) {
							ga();
							ha().forEach(function (b) {
								b._tippy.unmount();
							});
							if (N.parentNode) {
								N.parentNode.removeChild(N);
							}
							uh = uh.filter(function (b) {
								return b !== ma;
							});
							ma.state.isMounted = false;
							P("onHidden", [ma]);
						}
					},
					destroy: function () {
						if (!ma.state.isDestroyed) {
							ma.clearDelayTimeouts();
							ma.unmount();
							_();
							delete j._tippy;
							ma.state.isDestroyed = true;
							P("onDestroy", [ma]);
						}
					}
				};
				if (!u.render) {
					return ma;
				}
				var H = u.render(ma);
				var N = H.popper;
				var B = H.onUpdate;
				N.setAttribute("data-tippy-root", "");
				N.id = "tippy-" + ma.id;
				ma.popper = N;
				j._tippy = ma;
				N._tippy = ma;
				var C = G.map(function (b) {
					return b.fn(ma);
				});
				var D = j.hasAttribute("aria-expanded");
				$();
				R();
				O();
				P("onCreate", [ma]);
				if (u.showOnCreate) {
					ia();
				}
				N.addEventListener("mouseenter", function () {
					if (ma.props.interactive && ma.state.isVisible) {
						ma.clearDelayTimeouts();
					}
				});
				N.addEventListener("mouseleave", function () {
					if (ma.props.interactive && ma.props.trigger.indexOf("mouseenter") >= 0) {
						K().addEventListener("mousemove", pa);
					}
				});
				return ma;
				function E() {
					var b = ma.props.touch;
					if (Array.isArray(b)) {
						return b;
					} else {
						return [b, 0];
					}
				}
				function F() {
					return E()[0] === "hold";
				}
				function I() {
					var b;
					return (b = ma.props.render) != null && !!b.$$tippy;
				}
				function J() {
					return i || j;
				}
				function K() {
					var c;
					var d;
					var f = J().parentNode;
					if (f) {
						if ((d = Jg(f)[0]) != null && (c = d.ownerDocument) != null && c.body) {
							return d.ownerDocument;
						} else {
							return document;
						}
					} else {
						return document;
					}
				}
				function L() {
					return kh(N);
				}
				function M(b) {
					if (ma.state.isMounted && !ma.state.isVisible || Tg.isTouch || f && f.type === "focus") {
						return 0;
					} else {
						return Fg(ma.props.delay, b ? 0 : 1, _g.delay);
					}
				}
				function O(b = false) {
					N.style.pointerEvents = ma.props.interactive && !b ? "" : "none";
					N.style.zIndex = "" + ma.props.zIndex;
				}
				function P(d, a, b) {
					var c;
					if (b === undefined) {
						b = true;
					}
					C.forEach(function (c) {
						if (c[d]) {
							c[d].apply(c, a);
						}
					});
					if (b) {
						(c = ma.props)[d].apply(c, a);
					}
				}
				function Q() {
					var a = ma.props.aria;
					if (a.content) {
						var f = "aria-" + a.content;
						var c = N.id;
						Jg(ma.props.triggerTarget || j).forEach(function (d) {
							var e = d.getAttribute(f);
							if (ma.state.isVisible) {
								d.setAttribute(f, e ? e + " " + c : c);
							} else {
								var b = e && e.replace(c, "").trim();
								if (b) {
									d.setAttribute(f, b);
								} else {
									d.removeAttribute(f);
								}
							}
						});
					}
				}
				function R() {
					if (!D && ma.props.aria.expanded) {
						Jg(ma.props.triggerTarget || j).forEach(function (b) {
							if (ma.props.interactive) {
								b.setAttribute("aria-expanded", ma.state.isVisible && b === J() ? "true" : "false");
							} else {
								b.removeAttribute("aria-expanded");
							}
						});
					}
				}
				function S() {
					K().removeEventListener("mousemove", pa);
					oh = oh.filter(function (b) {
						return b !== pa;
					});
				}
				function T(b) {
					if (!Tg.isTouch || !la && b.type !== "mousedown") {
						var c = b.composedPath && b.composedPath()[0] || b.target;
						if (!ma.props.interactive || !Sg(N, c)) {
							if (Jg(ma.props.triggerTarget || j).some(function (a) {
								return Sg(a, c);
							})) {
								if (Tg.isTouch) {
									return;
								}
								if (ma.state.isVisible && ma.props.trigger.indexOf("click") >= 0) {
									return;
								}
							} else {
								P("onClickOutside", [ma, b]);
							}
							if (ma.props.hideOnClick === true) {
								ma.clearDelayTimeouts();
								ma.hide();
								w = true;
								setTimeout(function () {
									w = false;
								});
								if (!ma.state.isMounted) {
									X();
								}
							}
						}
					}
				}
				function U() {
					la = true;
				}
				function V() {
					la = false;
				}
				function W() {
					var b = K();
					b.addEventListener("mousedown", T, true);
					b.addEventListener("touchend", T, Dg);
					b.addEventListener("touchstart", V, Dg);
					b.addEventListener("touchmove", U, Dg);
				}
				function X() {
					var b = K();
					b.removeEventListener("mousedown", T, true);
					b.removeEventListener("touchend", T, Dg);
					b.removeEventListener("touchstart", V, Dg);
					b.removeEventListener("touchmove", U, Dg);
				}
				function Y(b, c) {
					var a = L().box;
					function d(e) {
						if (e.target === a) {
							Rg(a, "remove", d);
							c();
						}
					}
					if (b === 0) {
						return c();
					}
					Rg(a, "remove", h);
					Rg(a, "add", d);
					h = d;
				}
				function Z(b, c, a = false) {
					Jg(ma.props.triggerTarget || j).forEach(function (d) {
						d.addEventListener(b, c, a);
						oa.push({
							node: d,
							eventType: b,
							handler: c,
							options: a
						});
					});
				}
				function $() {
					var b;
					if (F()) {
						Z("touchstart", aa, {
							passive: true
						});
						Z("touchend", ca, {
							passive: true
						});
					}
					(b = ma.props.trigger, b.split(/\s+/).filter(Boolean)).forEach(function (b) {
						if (b !== "manual") {
							Z(b, aa);
							switch (b) {
								case "mouseenter":
									Z("mouseleave", ca);
									break;
								case "focus":
									Z($g ? "focusout" : "blur", da);
									break;
								case "focusin":
									Z("focusout", da);
							}
						}
					});
				}
				function _() {
					oa.forEach(function (f) {
						var b = f.node;
						var d = f.eventType;
						var a = f.handler;
						var c = f.options;
						b.removeEventListener(d, a, c);
					});
					oa = [];
				}
				function aa(a) {
					var b;
					var g = false;
					if (ma.state.isEnabled && !ea(a) && !w) {
						var h = ((b = f) == null ? undefined : b.type) === "focus";
						f = a;
						i = a.currentTarget;
						R();
						if (!ma.state.isVisible && Gg(a, "MouseEvent")) {
							oh.forEach(function (b) {
								return b(a);
							});
						}
						if (a.type === "click" && (ma.props.trigger.indexOf("mouseenter") < 0 || t) && ma.props.hideOnClick !== false && ma.state.isVisible) {
							g = true;
						} else {
							ia(a);
						}
						if (a.type === "click") {
							t = !g;
						}
						if (g && !h) {
							ja(a);
						}
					}
				}
				function ba(c) {
					var d = c.target;
					var e = J().contains(d) || N.contains(d);
					if (c.type !== "mousemove" || !e) {
						var a = ha().concat(N).map(function (a) {
							var b;
							var e = (b = a._tippy.popperInstance) == null ? undefined : b.state;
							if (e) {
								return {
									popperRect: a.getBoundingClientRect(),
									popperState: e,
									props: u
								};
							} else {
								return null;
							}
						}).filter(Boolean);
						if (function (c, d) {
							var q = d.clientX;
							var g = d.clientY;
							return c.every(function (b) {
								var e = b.popperRect;
								var f = b.popperState;
								var a = b.props.interactiveBorder;
								var c = f.placement.split("-")[0];
								var d = f.modifiersData.offset;
								if (!d) {
									return true;
								}
								var h = c === "bottom" ? d.top.y : 0;
								var i = c === "top" ? d.bottom.y : 0;
								var j = c === "right" ? d.left.x : 0;
								var k = c === "left" ? d.right.x : 0;
								var l = e.top - g + h > a;
								var m = g - e.bottom - i > a;
								var n = e.left - q + j > a;
								var o = q - e.right - k > a;
								return l || m || n || o;
							});
						}(a, c)) {
							S();
							ja(c);
						}
					}
				}
				function ca(b) {
					if (!ea(b) && (ma.props.trigger.indexOf("click") < 0 || !t)) {
						if (ma.props.interactive) {
							ma.hideWithInteractivity(b);
						} else {
							ja(b);
						}
					}
				}
				function da(b) {
					if ((ma.props.trigger.indexOf("focusin") >= 0 || b.target === J()) && (!ma.props.interactive || !b.relatedTarget || !N.contains(b.relatedTarget))) {
						ja(b);
					}
				}
				function ea(b) {
					return !!Tg.isTouch && F() !== b.type.indexOf("touch") >= 0;
				}
				function fa() {
					ga();
					var k = ma.props;
					var d = k.popperOptions;
					var b = k.placement;
					var c = k.offset;
					var a = k.getReferenceClientRect;
					var e = k.moveTransition;
					var f = I() ? kh(N).arrow : null;
					var g = a ? {
						getBoundingClientRect: a,
						contextElement: a.contextElement || J()
					} : j;
					var h = [{
						name: "offset",
						options: {
							offset: c
						}
					}, {
						name: "preventOverflow",
						options: {
							padding: {
								top: 2,
								bottom: 2,
								left: 5,
								right: 5
							}
						}
					}, {
						name: "flip",
						options: {
							padding: 5
						}
					}, {
						name: "computeStyles",
						options: {
							adaptive: !e
						}
					}, {
						name: "$$tippy",
						enabled: true,
						phase: "beforeWrite",
						requires: ["computeStyles"],
						fn: function (d) {
							var e = d.state;
							if (I()) {
								var a = L().box;
								["placement", "reference-hidden", "escaped"].forEach(function (c) {
									if (c === "placement") {
										a.setAttribute("data-placement", e.placement);
									} else if (e.attributes.popper["data-popper-" + c]) {
										a.setAttribute("data-" + c, "");
									} else {
										a.removeAttribute("data-" + c);
									}
								});
								e.attributes.popper = {};
							}
						}
					}];
					if (I() && f) {
						h.push({
							name: "arrow",
							options: {
								element: f,
								padding: 3
							}
						});
					}
					h.push.apply(h, (d == null ? undefined : d.modifiers) || []);
					ma.popperInstance = yg(g, N, Object.assign({}, d, {
						placement: b,
						onFirstUpdate: l,
						modifiers: h
					}));
				}
				function ga() {
					if (ma.popperInstance) {
						ma.popperInstance.destroy();
						ma.popperInstance = null;
					}
				}
				function ha() {
					return Lg(N.querySelectorAll("[data-tippy-root]"));
				}
				function ia(b) {
					ma.clearDelayTimeouts();
					if (b) {
						P("onTrigger", [ma, b]);
					}
					W();
					var c = M(true);
					var h = E();
					var e = h[0];
					var f = h[1];
					if (Tg.isTouch && e === "hold" && f) {
						c = f;
					}
					if (c) {
						d = setTimeout(function () {
							ma.show();
						}, c);
					} else {
						ma.show();
					}
				}
				function ja(c) {
					ma.clearDelayTimeouts();
					P("onUntrigger", [ma, c]);
					if (ma.state.isVisible) {
						if (ma.props.trigger.indexOf("mouseenter") < 0 || ma.props.trigger.indexOf("click") < 0 || ["mouseleave", "mousemove"].indexOf(c.type) < 0 || !t) {
							var b = M(false);
							if (b) {
								e = setTimeout(function () {
									if (ma.state.isVisible) {
										ma.hide();
									}
								}, b);
							} else {
								a = requestAnimationFrame(function () {
									ma.hide();
								});
							}
						}
					} else {
						X();
					}
				}
			}
			function xh(b, c = undefined) {
				if (c === undefined) c = {};
				var d = _g.plugins.concat(c.plugins || []);
				document.addEventListener("touchstart", Vg, Dg);
				unsafeWindow.addEventListener("blur", Yg);
				var e;
				var i = Object.assign({}, c, {
					plugins: d
				});
				var g = (e = b, Og(e) ? [e] : function (a) {
					return Gg(a, "NodeList");
				}(e) ? Lg(e) : Array.isArray(e) ? e : Lg(document.querySelectorAll(e))).reduce(function (d, a) {
					var b = a && Ah(a, i);
					if (b) {
						d.push(b);
					}
					return d;
				}, []);
				if (Og(b)) {
					return g[0];
				} else {
					return g;
				}
			}
			xh.defaultProps = _g;
			xh.setDefaultProps = function (a) {
				Object.keys(a).forEach(function (b) {
					_g[b] = a[b];
				});
			};
			xh.currentInput = Tg;
			Object.assign({}, kg, {
				effect: function (b) {
					var c = b.state;
					var d = {
						popper: {
							position: c.options.strategy,
							left: "0",
							top: "0",
							margin: "0"
						},
						arrow: {
							position: "absolute"
						},
						reference: {}
					};
					Object.assign(c.elements.popper.style, d.popper);
					c.styles = d;
					if (c.elements.arrow) {
						Object.assign(c.elements.arrow.style, d.arrow);
					}
				}
			});
			xh.setDefaultProps({
				render: lh
			});
			const yh = xh;
			class wh {
				isOpen = false;
				pane;
				tab;
				panelContainer;
				req;
				selected = {
					stick: "",
					spectate: "",
					striker: "",
					bullet: ""
				};
				template = {
					text: "-- Select player --",
					value: "",
					player: ""
				};
				players = [this.template];
				toggleMenu = ["Insert", "Numpad0", "Slash"];
				constructor() {
					let V = this;
					this.panelContainer = document.createElement("div");
					this.panelContainer.id = "panelContainer";
					document.body.appendChild(this.panelContainer);
					this.panelContainer.style.position = "absolute";
					this.panelContainer.style.top = "50%";
					this.panelContainer.style.left = "50%";
					this.panelContainer.style.transform = "scale(0) translate(-50%, -50%)";
					this.panelContainer.style.transformOrigin = "top left";
					this.panelContainer.style.zIndex = "1000";
					this.panelContainer.style.width = "390px";
					this.panelContainer.style.height = "273px";
					this.panelContainer.style.pointerEvents = "none";
					this.panelContainer.style.transition = "transform 0.3s ease-in-out";
					this.panelContainer.style.display = "none";
					this.panelContainer.style.fontFamily = "BaseFontBold, RubikBold, FallbackFontBold";
					let y = new pf.A();
					this.pane = new nf({
						title: of.cy + " v" + of.rE,
						container: this.panelContainer,
						expanded: true
					});
					this.tab = this.pane.addTab({
						pages: [{
							title: "General"
						}, {
							title: "Main"
						}, {
							title: "Other"
						}, {
							title: "Visual"
						}, {
							title: "Clicker"
						}, {
							title: "Binds"
						}]
					});
					this.tab.pages[0].addBinding(y, "store", {
						label: "Open shop",
						disabled: true
					});
					this.tab.pages[0].addBinding(y, "containers", {
						label: "Open containers"
					}).on("change", function (a) {
						y.openContainers(a.value);
					});
					this.tab.pages[0].addBinding(y, "upgrade", {
						label: "Fast upgrade"
					}).on("change", function (a) {
						y.fastUpgrade(a.value);
					});
					this.tab.pages[0].addBinding(unsafeWindow.config.data.antiKick, "state", {
						label: "Remove idle timer"
					});
					const l = this.tab.pages[0].addBinding(unsafeWindow.config.data.shortcuts, "notification", {
						label: "Shortcuts notification",
						hidden: !unsafeWindow.config.data.shortcuts.state
					});
					this.tab.pages[0].addBinding(unsafeWindow.config.data.shortcuts, "state", {
						label: "Enable shortcuts",
						index: 4
					}).on("change", function (a) {
						l.hidden = !a.value;
					});
					this.tab.pages[0].addBinding(unsafeWindow.config.data.ui, "showPPS", {
						label: "Show Bullets number"
					});
					this.tab.pages[0].addBinding(unsafeWindow.config.data.ui, "showMinesCounter", {
						label: "Show Mines count"
					});
					this.tab.pages[0].addBinding(unsafeWindow.config.data.themes, "theme", {
						label: "Theme",
						options: {
							Classic: "classic",
							Tanki: "tanki",
							"Translucent ": "translucent",
							"Iceberg ": "iceberg",
							"Jetblack ": "jetblack",
							"Light ": "light",
							"Retro ": "retro",
							"Vivid ": "vivid"
						}
					}).on("change", function (a) {
						unsafeWindow.themeManager.setTheme(a.value);
					});
					this.tab.pages[0].addBlade({
						view: "separator"
					});
					this.tab.pages[0].addButton({
						title: "Copy chat logs to the clipboard"
					}).on("click", () => {
						y.chatLog();
					});
					this.tab.pages[0].addButton({
						title: "Reset all preferences to default"
					}).on("click", () => {
						unsafeWindow.config.reset();
						location.reload();
					});
					const r = this.tab.pages[1].addFolder({
						title: "Fly hack"
					});
					const AA = r.addBinding(unsafeWindow.config.data.airBreakData.killZoneData, "state", {
						label: "Limiting kill zones",
					});
					r.addBinding(unsafeWindow.config.data.airBreakData.speedData, "state", {
						label: "Speed",
						step: 1,
						min: 1,
						max: 700
					});
					const A = r.addBinding(unsafeWindow.config.data.airBreakData, "flip", {
						label: "Flip",
						hidden: unsafeWindow.config.data.airBreakData.typeData.state !== "default"
					});
					const H = r.addBinding(unsafeWindow.config.data.airBreakData, "tilt", {
						label: "Tilt",
						hidden: unsafeWindow.config.data.airBreakData.typeData.state !== "default"
					});
					r.addBinding(unsafeWindow.config.data.airBreakData.typeData, "state", {
						index: 0,
						label: "Type",
						options: {
							Default: "default",
							AirWalk: "airWalk",
							Simple: "noob",
						}
					}).on("change", function (b) {
						if (b.value === "default") {
							A.hidden = false;
							H.hidden = false;
						} else {
							A.hidden = true;
							H.hidden = true;
						}
					});
					const W = this.tab.pages[1].addFolder({
						title: "Anti-aim"
					});
					const a = W.addBinding(unsafeWindow.config.data.airBreakData.autoMove.location, "value", {
						label: "Teleport location",
						options: {
							"Top of the map": "up",
							"Under the map": "under",
							Both: "both"
						},
						hidden: !unsafeWindow.config.data.airBreakData.autoMove.bind.state
					});
					const zz = W.addBinding(unsafeWindow.config.data.airBreakData.autoMove.zigzag.bind, "state", {
						index: 0,
						label: "ZigZag",
						hidden: !unsafeWindow.config.data.airBreakData.autoMove.bind.state
					})
					let b = undefined;
					if (window.location.href.includes("deploy")) {
						b = W.addBinding(unsafeWindow.config.data.airBreakData.autoMove, "delay", {
							label: "Anti crash",
							hidden: !unsafeWindow.config.data.airBreakData.autoMove.bind.state
						});
					} else {
						unsafeWindow.config.data.airBreakData.autoMove.delay = false;
					}
					W.addBinding(unsafeWindow.config.data.airBreakData.autoMove.bind, "state", {
						index: 0,
						label: "Enable "
					}).on("change", function (c) {
						a.hidden = !c.value;
						if (b) {
							b.hidden = !c.value;
						}
						zz.hidden = !c.value;
					});
					const c = this.tab.pages[1].addFolder({
						title: "Stick"
					});
					const e = c.addBinding(unsafeWindow.config.data.stickData, "onlyEnemies", {
						label: "Only enemies",
						hidden: !unsafeWindow.config.data.stickData.state
					});
					this.stickPlayersMenu = c.addBinding(this.selected, "stick", {
						label: "Target",
						options: this.players,
						value: this.selected.stick,
						hidden: !unsafeWindow.config.data.stickData.state
					}).on("change", function (c) {
						if (c.value && c.value != "") {
							let a = V.stickPlayersMenu.options.find(a => a.value === c.value);
							if (a) {
								return unsafeWindow.stick.stick(a.player);
							}
						}
					});
					const d = c.addBinding(unsafeWindow.config.data.stickData.distance, "value", {
						label: "Distance",
						step: 10,
						min: -3000,
						max: 3000,
						hidden: !unsafeWindow.config.data.stickData.state
					});
					const f = c.addBinding(unsafeWindow.config.data.stickData.randomizer.bind, "state", {
						label: "Randomizer",
						hidden: !unsafeWindow.config.data.stickData.state
					});
					c.addBinding(unsafeWindow.config.data.stickData, "state", {
						index: 0,
						label: "Enable"
					}).on("change", function (a) {
						V.stickPlayersMenu.hidden = !a.value;
						e.hidden = !a.value;
						d.hidden = !a.value;
						f.hidden = !a.value;
						if (!a.value) {
							unsafeWindow.stick.clean();
						}
					});
					const g = this.tab.pages[1].addFolder({
						title: "Bullets teleport"
					});
					const h = g.addBinding(unsafeWindow.config.data.bulletTP, "bulletNumber", {
						hidden: !unsafeWindow.config.data.bulletTP.activate.bind.state,
						label: "Number of bullets",
						step: 1,
						min: 1,
						max: 500
					});
					const i = g.addBinding(unsafeWindow.config.data.bulletTP, "autoShot", {
						hidden: !unsafeWindow.config.data.bulletTP.activate.bind.state,
						label: "Auto hit"
					});
					const j = g.addBinding(unsafeWindow.config.data.bulletTP, "onlyEnemies", {
						label: "Only enemies ",
						hidden: !unsafeWindow.config.data.bulletTP.activate.bind.state
					});
					this.bulletPlayersMenu = g.addBinding(this.selected, "bullet", {
						label: "Target",
						options: this.players,
						value: this.selected.bullet,
						hidden: !unsafeWindow.config.data.bulletTP.activate.bind.state
					}).on("change", function (d) {
						if (d.value && d.value != "") {
							let a = V.bulletPlayersMenu.options.find(a => a.value === d.value);
							if (a) {
								return unsafeWindow.bulletTP.setTarget(a.player, d.value);
							}
						}
					});
					g.addBinding(unsafeWindow.config.data.bulletTP.activate.bind, "state", {
						index: 0,
						label: "Enable  "
					}).on("change", function (a) {
						V.bulletPlayersMenu.hidden = !a.value;
						h.hidden = !a.value;
						i.hidden = !a.value;
						j.hidden = !a.value;
					});
					const k = this.tab.pages[1].addFolder({
						title: "Striker",
						expanded: false
					});
					const m = k.addBinding(unsafeWindow.config.data.weaponData.strikerData.shellsTeleportData, "onlyEnemies", {
						label: "Only enemies",
						hidden: !unsafeWindow.config.data.weaponData.strikerData.shellsTeleportData.state
					});
					this.strikerPlayersMenu = k.addBinding(this.selected, "striker", {
						label: "Target",
						options: this.players,
						hidden: !unsafeWindow.config.data.weaponData.strikerData.shellsTeleportData.state
					}).on("change", function (c) {
						if (c.value && c.value != "") {
							let a = V.strikerPlayersMenu.options.find(a => a.value === c.value);
							if (a) {
								return unsafeWindow.striker.target(a.player);
							}
						}
					});
					k.addBinding(unsafeWindow.config.data.weaponData.strikerData.shellsTeleportData, "state", {
						index: 0,
						label: "Enable"
					}).on("change", function (a) {
						V.strikerPlayersMenu.hidden = !a.value;
						m.hidden = !a.value;
						if (!a.value) {
							unsafeWindow.stick.clean();
						}
					});
					const n = this.tab.pages[2];
					let o = n.addBinding(unsafeWindow.config.data.aimBot, "fov", {
						hidden: !unsafeWindow.config.data.aimBot.bind.state,
						index: 1,
						label: "Field of view",
						step: 1,
						min: 1,
						max: 180
					});
					n.addBinding(unsafeWindow.config.data.aimBot.bind, "state", {
						index: 0,
						label: "AimBot"
					}).on("change", function (a) {
						o.hidden = !a.value;
					});
					let p = n.addBinding(unsafeWindow.config.data.otherData.speedHack, "value", {
						hidden: !unsafeWindow.config.data.otherData.speedHack.bind.state,
						index: 3,
						label: "Speed",
						step: 0.1,
						min: 1,
						max: 100
					});
					n.addBinding(unsafeWindow.config.data.otherData.speedHack.bind, "state", {
						index: 2,
						label: "Speed hack"
					}).on("change", function (a) {
						p.hidden = !a.value;
					});
					let q = n.addBinding(unsafeWindow.config.data.otherData.autoHealingClicker, "percentage", {
						hidden: !unsafeWindow.config.data.otherData.autoHealingClicker.bind.state,
						index: 5,
						label: "When health is (%)",
						step: 1,
						min: 1,
						max: 99
					});
					n.addBinding(unsafeWindow.config.data.otherData.autoHealingClicker.bind, "state", {
						index: 4,
						label: "Auto healing"
					}).on("change", function (a) {
						q.hidden = !a.value;
					});
					n.addBinding(unsafeWindow.config.data.otherData.autoShot.bind, "state", {
						label: "Auto shot"
					});
					n.addBinding(unsafeWindow.config.data.flagTeleportData.bind, "state", {
						label: "Flag teleport"
					});
					n.addBinding(unsafeWindow.config.data.otherData.boxTeleport.bind, "state", {
						label: "Box teleport"
					});
					n.addBinding(unsafeWindow.config.data.otherData.showUsernames.bind, "state", {
						label: "Show usernames"
					});
					n.addBinding(unsafeWindow.config.data.syncData.verticalAntiAim.bind, "state", {
						label: "Vertical antiAim"
					});
					n.addBinding(unsafeWindow.config.data.otherData.hitArea.bind, "state", {
						label: "Expand hit area"
					});
					const s = n.addFolder({
						title: "Mines"
					});
					const aa = s.addBinding(unsafeWindow.config.data.removeMinesData, "type", {
						index: 1,
						label: "Remove mines type",
						options: {
							"All mines": "all",
							"Team mines": "team",
							"Enemies mines": "enemies"
						},
						hidden: !unsafeWindow.config.data.removeMinesData.bind.state
					});
					s.addBinding(unsafeWindow.config.data.removeMinesData.bind, "state", {
						index: 0,
						label: "Remove mines"
					}).on("change", function (a) {
						aa.hidden = !a.value;
					});
					const t = s.addBinding(unsafeWindow.config.data.syncData.antiMineData, "height", {
						hidden: !unsafeWindow.config.data.syncData.antiMineData.bind.state,
						label: "Height",
						step: 5,
						min: -200,
						max: 500,
						index: 3,
					});
					s.addBinding(unsafeWindow.config.data.syncData.antiMineData.bind, "state", {
						index: 2,
						label: "Walk on mines"
					}).on("change", function (a) {
						t.hidden = !a.value;
					});
					const u = n.addFolder({
						title: "Physics"
					});
					u.addBinding(unsafeWindow.config.data.physics.noTilt.bind, "state", {
						label: "No tilt"
					});
					u.addBinding(unsafeWindow.config.data.physics.ignoreTanks.bind, "state", {
						label: "Ignore tanks"
					});
					u.addBinding(unsafeWindow.config.data.physics.noKnockback.bind, "state", {
						label: "No knockback"
					});
					u.addBinding(unsafeWindow.config.data.otherData.freezeTanks.bind, "state", {
						label: "Freeze tanks"
					});
					let v = u.addBinding(unsafeWindow.config.data.physics.recoil, "value", {
						hidden: !unsafeWindow.config.data.physics.recoil.bind.state,
						index: 5,
						label: "Recoil value",
						step: 1,
						min: -100,
						max: 100
					});
					u.addBinding(unsafeWindow.config.data.physics.recoil.bind, "state", {
						label: "Recoil",
						index: 4
					}).on("change", function (a) {
						v.hidden = !a.value;
					});
					let w = u.addBinding(unsafeWindow.config.data.physics.mass, "value", {
						hidden: !unsafeWindow.config.data.physics.mass.bind.state,
						index: 7,
						label: "Mass value",
						step: 1,
						min: -10,
						max: 10
					});
					u.addBinding(unsafeWindow.config.data.physics.mass.bind, "state", {
						label: "Mass",
						index: 6
					}).on("change", function (a) {
						w.hidden = !a.value;
					});
					let x = u.addBinding(unsafeWindow.config.data.physics.gravity, "value", {
						hidden: !unsafeWindow.config.data.physics.gravity.bind.state,
						index: 9,
						label: "Gravity value",
						step: 5,
						min: -50,
						max: 50
					});
					u.addBinding(unsafeWindow.config.data.physics.gravity.bind, "state", {
						label: "Gravity",
						index: 8
					}).on("change", function (a) {
						x.hidden = !a.value;
					});
					u.addBinding(unsafeWindow.config.data.physics.oldPhysics.bind, "state", {
						index: 11,
						label: "Old physics"
					});
					let xx = u.addBinding(unsafeWindow.config.data.physics.noFlip, "value", {
						hidden: !unsafeWindow.config.data.physics.noFlip.bind.state,
						index: 12,
						label: "No Flip value",
						step: 0.01,
						min: 0.01,
						max: 0.70
					});
					u.addBinding(unsafeWindow.config.data.physics.noFlip.bind, "state", {
						label: "No flip",
						index: 11
					}).on("change", function (a) {
						xx.hidden = !a.value;
					});
					let c1 = this.tab.pages[4].addBinding(unsafeWindow.config.data.clickerData.autoHealingData, "delay", {
						hidden: !unsafeWindow.config.data.clickerData.autoHealingData.state,
						index: 1,
						label: "Repair Kit delay (ms)",
						step: 10,
						min: 0,
						max: 60000
					});
					this.tab.pages[4].addBinding(unsafeWindow.config.data.clickerData.autoHealingData, "state", {
						index: 0,
						label: "Repair Kit"
					}).on("change", function (a) {
						c1.hidden = !a.value;
					});
					let c2 = this.tab.pages[4].addBinding(unsafeWindow.config.data.clickerData.autoArmorData, "delay", {
						hidden: !unsafeWindow.config.data.clickerData.autoArmorData.state,
						index: 3,
						label: "Boosted Armor delay (ms)",
						step: 10,
						min: 0,
						max: 60000
					});
					this.tab.pages[4].addBinding(unsafeWindow.config.data.clickerData.autoArmorData, "state", {
						index: 2,
						label: "Boosted Armor"
					}).on("change", function (a) {
						c2.hidden = !a.value;
					});
					let c3 = this.tab.pages[4].addBinding(unsafeWindow.config.data.clickerData.autoDamageData, "delay", {
						hidden: !unsafeWindow.config.data.clickerData.autoDamageData.state,
						index: 5,
						label: "Boosted Damage delay (ms)",
						step: 10,
						min: 0,
						max: 60000
					});
					this.tab.pages[4].addBinding(unsafeWindow.config.data.clickerData.autoDamageData, "state", {
						index: 4,
						label: "Boosted Damage"
					}).on("change", function (a) {
						c3.hidden = !a.value;
					});
					let c4 = this.tab.pages[4].addBinding(unsafeWindow.config.data.clickerData.autoNitroData, "delay", {
						hidden: !unsafeWindow.config.data.clickerData.autoNitroData.state,
						index: 7,
						label: "Speed Boost delay (ms)",
						step: 10,
						min: 0,
						max: 60000
					});
					this.tab.pages[4].addBinding(unsafeWindow.config.data.clickerData.autoNitroData, "state", {
						index: 6,
						label: "Speed Boost"
					}).on("change", function (a) {
						c4.hidden = !a.value;
					});
					const z = this.tab.pages[4].addBinding(unsafeWindow.config.data.clickerData.autoMiningData, "multiply", {
						label: "Mine multiplay",
						step: 1,
						min: 1,
						max: 100,
						hidden: !unsafeWindow.config.data.clickerData.autoMiningData.state,
						index: 10
					});
					const B = this.tab.pages[4].addBinding(unsafeWindow.config.data.clickerData.autoMiningData, "delay", {
						label: "Mine Delay (ms)",
						step: 10,
						min: 0,
						max: 60000,
						hidden: !unsafeWindow.config.data.clickerData.autoMiningData.state,
						index: 9
					});
					this.tab.pages[4].addBinding(unsafeWindow.config.data.clickerData.autoMiningData, "state", {
						label: "Mine",
						index: 8
					}).on("change", function (a) {
						z.hidden = !a.value;
						B.hidden = !a.value;
					});
					const C = this.tab.pages[3].addFolder({
						title: "Outline"
					});
					const D = C.addFolder({
						title: "My team"
					});
					const E = D.addBinding(unsafeWindow.config.data.wallHackData.tankGlowData.colorTeam, "hex", {
						label: "Color",
						hidden: !unsafeWindow.config.data.wallHackData.tankGlowData.colorTeam.state
					}).on("change", function (a) {
						if (a.last) {
							unsafeWindow.config.data.wallHackData.tankGlowData.colorTeam.dec = unsafeWindow.wallhack.hexToDecimal(a.value);
						}
					});
					const F = D.addBinding(unsafeWindow.config.data.wallHackData.tankGlowData.colorTeam, "bold", {
						label: "Bold",
						hidden: !unsafeWindow.config.data.wallHackData.tankGlowData.colorTeam.state
					});
					D.addBinding(unsafeWindow.config.data.wallHackData.tankGlowData.colorTeam, "state", {
						label: "Enable",
						index: 0
					}).on("change", function (a) {
						if (a.last) {
							E.hidden = !a.value;
							F.hidden = !a.value;
						}
					});
					const G = C.addFolder({
						title: "Enemy team"
					});
					const I = G.addBinding(unsafeWindow.config.data.wallHackData.tankGlowData.colorEnemy, "hex", {
						label: "Color",
						hidden: !unsafeWindow.config.data.wallHackData.tankGlowData.colorEnemy.state
					}).on("change", function (a) {
						if (a.last) {
							unsafeWindow.config.data.wallHackData.tankGlowData.colorEnemy.dec = unsafeWindow.wallhack.hexToDecimal(a.value);
						}
					});
					const J = G.addBinding(unsafeWindow.config.data.wallHackData.tankGlowData.colorEnemy, "bold", {
						label: "Bold",
						hidden: !unsafeWindow.config.data.wallHackData.tankGlowData.colorEnemy.state
					});
					G.addBinding(unsafeWindow.config.data.wallHackData.tankGlowData.colorEnemy, "state", {
						label: "Enable",
						index: 0
					}).on("change", function (a) {
						if (a.last) {
							I.hidden = !a.value;
							J.hidden = !a.value;
						}
					});
					const K = C.addFolder({
						title: "Bullet teleport target"
					});
					const L = K.addBinding(unsafeWindow.config.data.wallHackData.tankGlowData.colorTarget, "hex", {
						label: "Color",
						hidden: !unsafeWindow.config.data.wallHackData.tankGlowData.colorTarget.state
					}).on("change", function (a) {
						if (a.last) {
							unsafeWindow.config.data.wallHackData.tankGlowData.colorTarget.dec = unsafeWindow.wallhack.hexToDecimal(a.value);
						}
					});
					const M = K.addBinding(unsafeWindow.config.data.wallHackData.tankGlowData.colorTarget, "bold", {
						label: "Bold",
						hidden: !unsafeWindow.config.data.wallHackData.tankGlowData.colorTarget.state
					});
					K.addBinding(unsafeWindow.config.data.wallHackData.tankGlowData.colorTarget, "state", {
						label: "Enable",
						index: 0
					}).on("change", function (a) {
						if (a.last) {
							L.hidden = !a.value;
							M.hidden = !a.value;
						}
					});
					const N = this.tab.pages[3].addFolder({
						title: "Camera"
					});
					const O = N.addBinding(unsafeWindow.config.data.cameraData, "fov", {
						label: "Field of view",
						step: 0.1,
						min: 1,
						max: 2,
						hidden: !unsafeWindow.config.data.cameraData.state
					});
					N.addBinding(unsafeWindow.config.data.cameraData, "state", {
						label: "GTA Camera",
						index: 0
					}).on("change", function (a) {
						O.hidden = !a.value;
					});
					const P = N.addBinding(unsafeWindow.config.data.spectateData, "onlyEnemies", {
						label: "Only enemies",
						hidden: !unsafeWindow.config.data.spectateData.bind.state
					});
					this.spectatePlayersMenu = N.addBinding(this.selected, "spectate", {
						label: "Target",
						options: this.players,
						hidden: !unsafeWindow.config.data.spectateData.bind.state
					}).on("change", function (c) {
						if (c.value && c.value != "") {
							let b = V.spectatePlayersMenu.options.find(b => b.value === c.value);
							if (b) {
								return unsafeWindow.cameraHack.spectate(b.player);
							}
						}
					});
					N.addBinding(unsafeWindow.config.data.spectateData.bind, "state", {
						label: "Spectate",
						index: 2
					}).on("change", function (a) {
						V.spectatePlayersMenu.hidden = !a.value;
						P.hidden = !a.value;
						if (!a.value) {
							unsafeWindow.cameraHack.clean();
						}
					});
					const Q = this.tab.pages[3].addFolder({
						title: "Filters"
					});
					Q.addBinding(unsafeWindow.config.data.filtersData, "blur", {
						label: "Blur",
						step: 1,
						min: 0,
						max: 5
					});
					Q.addBinding(unsafeWindow.config.data.filtersData, "brightness", {
						label: "Brightness",
						step: 0.1,
						min: 0,
						max: 1
					});
					Q.addBinding(unsafeWindow.config.data.filtersData, "contrast", {
						label: "Contrast",
						step: 1,
						min: 0,
						max: 200
					});
					Q.addBinding(unsafeWindow.config.data.filtersData, "grayscale", {
						label: "Grayscale",
						step: 1,
						min: 0,
						max: 100
					});
					Q.addBinding(unsafeWindow.config.data.filtersData, "hue-rotate", {
						label: "Hue-rotate",
						step: 1,
						min: 0,
						max: 360
					});
					Q.addBinding(unsafeWindow.config.data.filtersData, "invert", {
						label: "Invert",
						step: 1,
						min: 0,
						max: 100
					});
					Q.addBinding(unsafeWindow.config.data.filtersData, "saturate", {
						label: "Saturate",
						step: 0.1,
						min: 0,
						max: 5
					});
					Q.addBinding(unsafeWindow.config.data.filtersData, "sepia", {
						label: "Sepia",
						step: 1,
						min: 0,
						max: 100
					});
					Q.addButton({
						title: "Reset all filters"
					}).on("click", () => {
						unsafeWindow.filters.reset();
					});
					let R = {
						"Open containers": "Go to the containers page, then activate this option to open all containers",
						"Fast upgrade": "Select what you want to upgrade in the garage (turrets, hulls, drones, and protections), then activate this option. Don't forget to turn it off after you upgrade",
						"Remove idle timer": "Remove the 2 mins idle timer from battle, it works on pause as well",
						"Enable shortcuts": "Turn off this option if you don't want to use shortcuts. (To have more control over the shortcuts, check the 'Binds' tab)",
						"Shortcuts notification": "Show a notification every time you press a shortcut key (when cheats are activated/deactivated or when the target is changed)",
						"Show Bullets count": "Enabling this feature will show the number of bullets from Bullets teleport on the top right of the screen (Updated every second)",
						"Show Mines count": "Enabling this feature will show the Mines count inside the map on the top right of the screen (Shows 0 when Remove Mines is enabled)",
						"Enable ": "It only works if 'Fly Hack' is enabled and the type is 'Default'",
						Randomizer: "Automatically change the stick target to a random one",
						"Enable  ": "Works with Twins, Tunder, Smoky, Gauss, and Volcan",
						"Auto hit": "Automatically hit the target when you reach the selected number of bullets",
						"Only enemies ": "Show all targets on the target list or only the enemies, which is useful to narrow down the targets count (Works with shortcut targeting, too)",
						AimBot: "Work on all turrets, you can change the aim assist field of view below",
						"Auto healing": "Automatically activate the repair kit when your tank reaches a specific health percentage",
						"Box teleport": "Collect all boxes on the map (Supplies, gold boxes and containers)",
						"Ignore Tanks": "Ignore tanks' collision. Keep in mind that it ignores boxes as well",
						Recoil: "Turn off 'No knockback' before using this feature",
						ZigZag: "Decrease the chance of getting hit by Railgun while you on anti aim (up or both)",
						"Anti crash": "Decrease the chance of crashing when the ping is more than 2-3k while you on anti aim",
						"No flip": "This option will be ignored if `No tilt` is activated",
						"Expand hit area": "Hit players from the under the map or through walls if they close enough, Use with `Ignore tanks` for better experience",
						"Speed hack": "For Non-parkour battles the recommended values is 1.2",
						"Vertical AntiAim": "work on non parkour battles and doesn't require you to fly, do not use inside houses or under bridge",
						"Flag teleport": "For non-parkour battles, you will probably auto self destruct but you can rejoin and try again you chances are 1/5",
						"Freeze tanks": "Expose the real location of tanks that use desync hack or stay idle while flying",
					};
					document.querySelectorAll("div.tp-lblv_l").forEach(function (a) {
						if (R.hasOwnProperty(a.textContent)) {
							a.removeAttribute("class");
							let b = document.createElement("div");
							b.appendChild(a.cloneNode(true));
							b.classList.add("tp-lblv_l");
							b.style.display = "flex";
							b.style.marginTop = "var(--cnt-usp)";
							let e = document.createElement("div");
							e.style.marginLeft = "0.3em";
							e.style.opacity = "0.35";
							e.setAttribute("data-tippy-content", R[a.textContent]);
							let c = document.createElementNS("http://www.w3.org/2000/svg", "svg");
							c.setAttribute("xmlns", "http://www.w3.org/2000/svg");
							c.setAttribute("width", "1.2em");
							c.setAttribute("height", "1.2em");
							c.setAttribute("viewBox", "0 0 24 24");
							let d = document.createElementNS("http://www.w3.org/2000/svg", "path");
							d.setAttribute("fill", "var(--tp-container-foreground-color)");
							d.setAttribute("d", "M11.95 18q.525 0 .888-.363t.362-.887q0-.525-.362-.888t-.888-.362q-.525 0-.887.363t-.363.887q0 .525.363.888t.887.362m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22");
							c.appendChild(d);
							e.appendChild(c);
							b.appendChild(e);
							a.parentNode.replaceChild(b, a);
						}
					});
					let S = document.createElement("style");
					S.innerHTML = "\n        .tippy-box {\n            color: var(--tp-helper-color);\n            background-color: var(--tp-helper-bg);\n            padding: 0.5em;\n            border-radius: 0.2em;\n        }\n\n        .tippy-content {\n           \n        }\n    ";
					document.head.appendChild(S);
					yh("[data-tippy-content]", {
						arrow: true
					});
					const T = [{
						folder: "Fly hack",
						expanded: false,
						data: [{
							title: "Enable",
							key: unsafeWindow.config.data.airBreakData.toggleStateData.bind
						}, {
							title: "Move Up",
							key: unsafeWindow.config.data.airBreakData.movementData.up.bind
						}, {
							title: "Move Down",
							key: unsafeWindow.config.data.airBreakData.movementData.down.bind
						}, {
							title: "Move Forward",
							key: unsafeWindow.config.data.airBreakData.movementData.forward.bind
						}, {
							title: "Move Back",
							key: unsafeWindow.config.data.airBreakData.movementData.back.bind
						}, {
							title: "Move Left",
							key: unsafeWindow.config.data.airBreakData.movementData.left.bind
						}, {
							title: "Move Light",
							key: unsafeWindow.config.data.airBreakData.movementData.right.bind
						}]
					}, {
						folder: "Anti-Aim",
						expanded: false,
						data: [
							{
								title: "Enable/Disable",
								key: unsafeWindow.config.data.airBreakData.autoMove.bind
							},
							{
								title: "ZigZag",
								key: unsafeWindow.config.data.airBreakData.autoMove.zigzag.bind
							},
							{
								title: "Change location",
								key: unsafeWindow.config.data.airBreakData.autoMove.location.bind
							}
						]
					}, {
						folder: "Stick",
						expanded: false,
						data: [{
							title: "Enable/Next target",
							key: unsafeWindow.config.data.stickData.nextTargetData.bind
						}, {
							title: "Deactivate",
							key: unsafeWindow.config.data.stickData.deactivateData.bind
						}, {
							title: "Randomizer",
							key: unsafeWindow.config.data.stickData.randomizer.bind
						}, {
							title: "Further distance",
							key: unsafeWindow.config.data.stickData.distance.further
						}, {
							title: "Closer distance",
							key: unsafeWindow.config.data.stickData.distance.closer
						}]
					}, {
						folder: "Striker",
						expanded: false,
						data: [{
							title: "Select Target",
							key: unsafeWindow.config.data.weaponData.strikerData.shellsTeleportData.bind
						}]
					}, {
						folder: "Bullets teleport",
						expanded: false,
						data: [{
							title: "Enable/Diable",
							key: unsafeWindow.config.data.bulletTP.activate.bind
						}, {
							title: "Select Target",
							key: unsafeWindow.config.data.bulletTP.changeTarget.bind
						}, {
							title: "Hit target",
							key: unsafeWindow.config.data.bulletTP.hitTarget.bind
						}]
					}, {
						folder: "Other",
						expanded: false,
						data: [{
							title: "AimBot",
							key: unsafeWindow.config.data.aimBot.bind
						}, {
							title: "Speed hack",
							key: unsafeWindow.config.data.otherData.speedHack.bind
						}, {
							title: "Auto healing",
							key: unsafeWindow.config.data.otherData.autoHealingClicker.bind
						}, {
							title: "Auto shot",
							key: unsafeWindow.config.data.otherData.autoShot.bind
						}, {
							title: "Flag teleport",
							key: unsafeWindow.config.data.flagTeleportData.bind
						}, {
							title: "Box teleport",
							key: unsafeWindow.config.data.otherData.boxTeleport.bind
						}, {
							title: "Show usernames",
							key: unsafeWindow.config.data.otherData.showUsernames.bind
						}, {
							title: "Vertical AntiAim",
							key: unsafeWindow.config.data.syncData.verticalAntiAim.bind
						},
						{
							title: "Expad hit area",
							key: unsafeWindow.config.data.otherData.hitArea.bind
						}, {
							title: "Jump",
							key: unsafeWindow.config.data.otherData.jump.bind
						}]
					}, {
						folder: "Mines",
						expanded: false,
						data: [{
							title: "Remove mines",
							key: unsafeWindow.config.data.removeMinesData.bind
						}, {
							title: "Walk on mines",
							key: unsafeWindow.config.data.syncData.antiMineData.bind
						}]
					}, {
						folder: "Physics",
						expanded: false,
						data: [{
							title: "No tilt",
							key: unsafeWindow.config.data.physics.noTilt.bind
						},
						{
							title: "Ignore tanks",
							key: unsafeWindow.config.data.physics.ignoreTanks.bind
						}, {
							title: "No knockback",
							key: unsafeWindow.config.data.physics.noKnockback.bind
						}, {
							title: "Freeze tanks",
							key: unsafeWindow.config.data.otherData.freezeTanks.bind
						}, {
							title: "Gravity",
							key: unsafeWindow.config.data.physics.gravity.bind
						}, {
							title: "Mass",
							key: unsafeWindow.config.data.physics.mass.bind
						}, {
							title: "Recoil",
							key: unsafeWindow.config.data.physics.recoil.bind
						},
						{
							title: "Old physics",
							key: unsafeWindow.config.data.physics.oldPhysics.bind
						}, {
							title: "No flip",
							key: unsafeWindow.config.data.physics.noFlip.bind
						}]
					}, {
						folder: "Camera",
						expanded: false,
						data: [{
							title: "Spectate Target",
							key: unsafeWindow.config.data.spectateData.bind
						}]
					}, {
						folder: "Clicker",
						expanded: false,
						data: [{
							title: "Repair Kit",
							key: unsafeWindow.config.data.clickerData.autoHealingData.bind
						}, {
							title: "Boosted Armor",
							key: unsafeWindow.config.data.clickerData.autoArmorData.bind
						}, {
							title: "Boosted Damage",
							key: unsafeWindow.config.data.clickerData.autoDamageData.bind
						}, {
							title: "Speed Boost",
							key: unsafeWindow.config.data.clickerData.autoNitroData.bind
						}, {
							title: "Mine",
							key: unsafeWindow.config.data.clickerData.autoMiningData.bind
						}]
					}];
					for (let a of T) {
						let b = this.tab.pages[5].addFolder({
							title: a.folder,
							expanded: a.expanded
						});
						for (let e of a.data) {
							let input = b.addBinding(e.key, "key", {
								label: e.title
							}).controller.view.valueElement.querySelector(".tp-txtv_i")
							input.setAttribute("placeholder", "Press a key")
							input.addEventListener("keydown", function (b) {
								b.preventDefault();
								if (!V.isOpen) {
									return;
								}
								let d = b.code;
								if (d == "Backspace") {
									e.key.key = "";
								} else if (!V.toggleMenu.includes(d)) {
									for (let b of T) {
										for (let c of b.data) {
											if (d == c.key.key) {
												c.key.key = "";
											}
										}
									}
									e.key.key = d;
								}
							});
						}
					}
					this.dragElement(this.panelContainer);
					document.addEventListener("keyup", a => {
						if (!unsafeWindow.utils.isChatOpen() && this.toggleMenu.includes(a.code)) {
							this.onMenuKeyPressed();
						}
					});
				}
				onMenuKeyPressed = () => {
					this.showMenu();
					this.isOpen = !this.isOpen;
				};
				showMenu = () => {
					if (this.isOpen) {
						this.panelContainer.querySelectorAll("input, select, textarea, button, .tp-sldv_t, .tp-txtv_i, .tp-sldv_k").forEach(a => {
							a?.blur();
						});
						this.panelContainer.style.transform = "scale(0) translate(-50%, -50%)";
						setTimeout(() => {
							if (this.isOpen) {
								this.panelContainer.style.display = "none";
								this.panelContainer.style.pointerEvents = "none";
								this.panelContainer.style.zIndex = "-1000";
							}
						}, 300);
						cancelAnimationFrame(this.req);
						unsafeWindow.config.saveStates();
					} else {
						this.panelContainer.style.display = "block";
						this.panelContainer.style.right = "0";
						setTimeout(() => {
							this.panelContainer.style.transform = "scale(1) translate(-50%, -50%)";
							this.panelContainer.style.pointerEvents = "auto";
							this.panelContainer.style.zIndex = "1000";
						}, 0);
						document.exitPointerLock();
						this.req = requestAnimationFrame(this.process);
					}
				};
				dragElement = e => {
					let c = 0;
					let i = 0;
					let j = 0;
					let l = 0;
					let m = false;
					let p = document.getElementsByClassName("tp-rotv_b")[0];
					p.querySelector(".tp-rotv_m")?.remove();
					const b = b => {
						(b = b || unsafeWindow.event).preventDefault();
						if (m) {
							c = j - b.clientX;
							i = l - b.clientY;
							j = b.clientX;
							l = b.clientY;
							e.style.top = e.offsetTop - i + "px";
							e.style.left = e.offsetLeft - c + "px";
						}
					};
					const a = () => {
						m = false;
						document.onmouseup = null;
						document.onmousemove = null;
					};
					let d = p.cloneNode(true);
					p.parentNode.replaceChild(d, p);
					d.style.cursor = "grab";
					d.addEventListener("click", function (a) {
						a.preventDefault();
					});
					d.onmousedown = d => {
						(d = d || unsafeWindow.event).preventDefault();
						j = d.clientX;
						l = d.clientY;
						m = true;
						document.onmouseup = a;
						document.onmousemove = b;
					};
				};
				reset() {
					this.selected = {
						stick: "",
						spectate: "",
						striker: "",
						bullet: ""
					};
				}
				bulletMenu = () => {
					let d = [this.template];
					let b = unsafeWindow.utils.getTanks(unsafeWindow.config.data.bulletTP.onlyEnemies);
					if (unsafeWindow.utils.isArrayValid(b)) {
						for (const [a, e] of b.entries()) {
							let b = unsafeWindow.utils.getUsername(e);
							if (typeof b == "string") {
								d.push({
									text: b,
									value: b,
									player: e
								});
							}
						}
						this.bulletPlayersMenu.options = d;
						if (this.selected.bullet != "") {
							this.bulletPlayersMenu.controller.value.rawValue = this.selected.bullet;
							this.selected.bullet = "";
						}
					} else {
						this.bulletPlayersMenu.options = d;
					}
				};
				stickMenu = () => {
					let b = [this.template];
					let a = unsafeWindow.utils.getTanks(unsafeWindow.config.data.stickData.onlyEnemies);
					if (unsafeWindow.utils.isArrayValid(a)) {
						for (const [c, d] of a.entries()) {
							let a = unsafeWindow.utils.getUsername(d);
							if (typeof a == "string") {
								b.push({
									text: a,
									value: a,
									player: d
								});
							}
						}
						this.stickPlayersMenu.options = b;
						if (this.selected.stick != "") {
							this.stickPlayersMenu.controller.value.rawValue = this.selected.stick;
							this.selected.stick = "";
						}
					} else {
						this.stickPlayersMenu.options = b;
					}
				};
				spectateMenu = () => {
					let b = [this.template];
					let a = unsafeWindow.utils.getTanks(unsafeWindow.config.data.spectateData.onlyEnemies);
					if (unsafeWindow.utils.isArrayValid(a)) {
						for (const [c, d] of a.entries()) {
							let a = unsafeWindow.utils.getUsername(d);
							if (typeof a == "string") {
								b.push({
									text: a,
									value: a,
									player: d
								});
							}
						}
						this.spectatePlayersMenu.options = b;
						if (this.selected.spectate != "") {
							this.spectatePlayersMenu.controller.value.rawValue = this.selected.spectate;
							this.selected.spectate = "";
						}
					} else {
						this.spectatePlayersMenu.options = b;
					}
				};
				strikerMenu = () => {
					let b = [this.template];
					let a = unsafeWindow.utils.getTanks(unsafeWindow.config.data.weaponData.strikerData.shellsTeleportData.onlyEnemies);
					if (unsafeWindow.utils.isArrayValid(a)) {
						for (const [c, d] of a.entries()) {
							let a = unsafeWindow.utils.getUsername(d);
							if (typeof a == "string") {
								b.push({
									text: a,
									value: a,
									player: d
								});
							}
						}
						this.strikerPlayersMenu.options = b;
						if (this.selected.striker != "") {
							this.strikerPlayersMenu.controller.value.rawValue = this.selected.striker;
							this.selected.striker = "";
						}
					} else {
						this.strikerPlayersMenu.options = b;
					}
				};
				updatePlayers = () => {
					this.stickMenu();
					this.spectateMenu();
					this.strikerMenu();
					this.bulletMenu();
				};
				process = () => {
					this.req = requestAnimationFrame(this.process);
					this.updatePlayers();
					this.pane.refresh();
				};
			}
		},
		336: (e, a, c) => {
			c.d(a, {
				A: () => d
			});
			class d {
				send = (h, a) => {
					if (!unsafeWindow.config.data.shortcuts.notification) {
						return;
					}
					const b = document.querySelectorAll(".BattleMessagesComponentStyle-container");
					if (!b || b.length === 0) {
						return;
					}
					let d = "" + (typeof a == "boolean" ? a ? "enabled" : "disabled" : a);
					let c = document.querySelector(".malcomx");
					if (c) {
						c.style.opacity = 0;
						c.remove();
					}
					const e = document.createElement("span");
					e.classList.add("malcomx");
					e.innerHTML = h + " <strong>" + d + "</strong>";
					e.style.color = "rgb(0, 255, 85)";
					e.style.opacity = 1;
					e.style.position = "fixed";
					e.style.top = "50%";
					e.style.left = "50%";
					e.style.transform = "translate(-50%, -50%)";
					e.style.fontSize = "1.35rem";
					e.style.background = "rgba(0, 0, 0, 0.3)";
					e.style.padding = "0.5rem";
					e.style.transition = "opacity 0.5s ease-in-out";
					const f = b[0];
					if (f) {
						f.insertAdjacentElement("afterend", e);
					}
					unsafeWindow.config.saveStates();
					setTimeout(() => {
						e.style.opacity = 0;
					}, 1000);
				};
			}
		},
		362: (a, d, b) => {
			b.d(d, {
				A: () => e
			});
			class e {
				constructor() {
					this.setTheme(unsafeWindow.config.data.themes.theme);
				}
				setTheme = b => {
					let a;
					switch (b) {
						case "translucent":
							a = this.translucent();
							break;
						case "tanki":
							a = this.tanki();
							break;
						case "iceberg":
							a = this.iceberg();
							break;
						case "jetblack":
							a = this.jetblack();
							break;
						case "light":
							a = this.light();
							break;
						case "retro":
							a = this.retro();
							break;
						case "vivid":
							a = this.vivid();
							break;
						default:
							a = this.clssic();
					}
					if (document.getElementById("malcomx_theme")) {
						document.getElementById("malcomx_theme").remove();
					}
					this.insertStyle(this.clssic());
					this.insertStyle(a);
				};
				insertStyle(b) {
					if (b) {
						document.head.insertAdjacentHTML("beforeend", "\n            <style id=\"malcomx_theme\"> \n                .tp-rotv_t, .tp-tabv_t {\n                    font-family:BaseFontBold, RubikBold, FallbackFontBold !important;\n                }\n                .tp-lblv_l, .tp-lstv, .tp-btnv_t, .tp-fldv_t {\n                    font-family:BaseFontRegular, RubikRegular, FallbackFontRegular !important;\n                }\n                .tp-tbiv.tp-tbiv-sel .tp-tbiv_t {\n                    opacity: .99 !important;\n                }\n                :root {\n                    " + b + "\n                }\n            </style>");
					}
				}
				clssic() {
					return "\n            --tp-base-background-color: hsla(230, 7%, 17%, 1.00);\n            --tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);\n            --tp-button-background-color: hsla(230, 7%, 70%, 1.00);\n            --tp-button-background-color-active: hsla(230, 7%, 85%, 1.00);\n            --tp-button-background-color-focus: hsla(230, 7%, 80%, 1.00);\n            --tp-button-background-color-hover: hsla(230, 7%, 75%, 1.00);\n            --tp-button-foreground-color: hsla(230, 7%, 17%, 1.00);\n            --tp-container-background-color: hsla(230, 7%, 75%, 0.10);\n            --tp-container-background-color-active: hsla(230, 7%, 75%, 0.25);\n            --tp-container-background-color-focus: hsla(230, 7%, 75%, 0.20);\n            --tp-container-background-color-hover: hsla(230, 7%, 75%, 0.15);\n            --tp-container-foreground-color: hsla(230, 7%, 75%, 1.00);\n            --tp-groove-foreground-color: hsla(230, 7%, 75%, 0.10);\n            --tp-input-background-color: hsla(230, 7%, 75%, 0.10);\n            --tp-input-background-color-active: hsla(230, 7%, 75%, 0.25);\n            --tp-input-background-color-focus: hsla(230, 7%, 75%, 0.20);\n            --tp-input-background-color-hover: hsla(230, 7%, 75%, 0.15);\n            --tp-input-foreground-color: hsla(230, 7%, 75%, 1.00);\n            --tp-label-foreground-color: hsla(230, 7%, 75%, 0.70);\n            --tp-monitor-background-color: hsla(230, 7%, 0%, 0.20);\n            --tp-monitor-foreground-color: hsla(230, 7%, 75%, 0.70);\n            --tp-helper-color: hsla(230, 7%, 17%, 1.00);\n            --tp-helper-bg: hsla(230, 7%, 80%, 1.00);\n        ";
				}
				tanki() {
					return "\n            --tp-base-background-color: hsl(206, 46%, 20%);\n            --tp-base-shadow-color: rgba(118, 255, 51, 0.5) 0em 0em 0em 1px;\n            --tp-button-background-color: rgba(118, 255, 51, 0.25);\n            --tp-button-background-color-active: rgba(118, 255, 51, 0.45);\n            --tp-button-background-color-focus: hsl(209, 39%, 14%);\n            --tp-button-background-color-hover: rgba(118, 255, 51, 0.35);\n            --tp-button-foreground-color: rgb(118, 255, 51);\n            --tp-container-background-color: hsla(0, 0%, 0%, 0.20);\n            --tp-container-background-color-active: hsla(0, 0%, 0%, 0.35);\n            --tp-container-background-color-focus: hsla(0, 0%, 0%, 0.30);\n            --tp-container-background-color-hover: hsla(0, 0%, 0%, 0.25);\n            --tp-container-foreground-color: rgb(118, 255, 51);\n            --tp-groove-foreground-color: hsla(0, 0%, 0%, 0.50);\n            --tp-input-background-color: hsla(0, 0%, 0%, 0.50);\n            --tp-input-background-color-active: hsla(0, 0%, 0%, 0.65);\n            --tp-input-background-color-focus: hsla(0, 0%, 0%, 0.60);\n            --tp-input-background-color-hover: hsla(0, 0%, 0%, 0.55);\n            --tp-input-foreground-color: rgb(118, 255, 51);\n            --tp-label-foreground-color: rgb(255 255 255);\n            --tp-monitor-background-color: hsla(0, 0%, 0%, 0.50);\n            --tp-monitor-foreground-color: rgb(118, 255, 51);\n            --tp-helper-color: rgb(118, 255, 51);\n            --tp-helper-bg: hsl(209, 39%, 14%);\n        ";
				}
				translucent() {
					return "\n            --tp-base-background-color: hsla(0, 0%, 10%, 0.8);\n            --tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);\n            --tp-button-background-color: hsla(0, 0%, 80%, 1);\n            --tp-button-background-color-active: hsla(0, 0%, 100%, 1);\n            --tp-button-background-color-focus: hsla(0, 0%, 95%, 1);\n            --tp-button-background-color-hover: hsla(0, 0%, 85%, 1);\n            --tp-button-foreground-color: hsla(0, 0%, 0%, 0.8);\n            --tp-container-background-color: hsla(0, 0%, 0%, 0.3);\n            --tp-container-background-color-active: hsla(0, 0%, 0%, 0.6);\n            --tp-container-background-color-focus: hsla(0, 0%, 0%, 0.5);\n            --tp-container-background-color-hover: hsla(0, 0%, 0%, 0.4);\n            --tp-container-foreground-color: hsla(0, 0%, 100%, 0.5);\n            --tp-groove-foreground-color: hsla(0, 0%, 0%, 0.2);\n            --tp-input-background-color: hsla(0, 0%, 0%, 0.3);\n            --tp-input-background-color-active: hsla(0, 0%, 0%, 0.6);\n            --tp-input-background-color-focus: hsla(0, 0%, 0%, 0.5);\n            --tp-input-background-color-hover: hsla(0, 0%, 0%, 0.4);\n            --tp-input-foreground-color: hsla(0, 0%, 100%, 0.5);\n            --tp-label-foreground-color: hsla(0, 0%, 100%, 0.5);\n            --tp-monitor-background-color: hsla(0, 0%, 0%, 0.3);\n            --tp-monitor-foreground-color: hsla(0, 0%, 100%, 0.3);\n            --tp-helper-color: hsla(0, 0%, 80%, 1);\n            --tp-helper-bg: hsla(0, 0%, 10%, 0.8);\n            ";
				}
				iceberg() {
					return "\n            --tp-base-background-color: hsla(230, 20%, 11%, 1.00);\n            --tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);\n            --tp-button-background-color: hsla(230, 10%, 80%, 1.00);\n            --tp-button-background-color-active: hsla(230, 10%, 95%, 1.00);\n            --tp-button-background-color-focus: hsla(230, 10%, 90%, 1.00);\n            --tp-button-background-color-hover: hsla(230, 10%, 85%, 1.00);\n            --tp-button-foreground-color: hsla(230, 20%, 11%, 1.00);\n            --tp-container-background-color: hsla(230, 25%, 16%, 1.00);\n            --tp-container-background-color-active: hsla(230, 25%, 31%, 1.00);\n            --tp-container-background-color-focus: hsla(230, 25%, 26%, 1.00);\n            --tp-container-background-color-hover: hsla(230, 25%, 21%, 1.00);\n            --tp-container-foreground-color: hsla(230, 10%, 80%, 1.00);\n            --tp-groove-foreground-color: hsla(230, 20%, 8%, 1.00);\n            --tp-input-background-color: hsla(230, 20%, 8%, 1.00);\n            --tp-input-background-color-active: hsla(230, 28%, 23%, 1.00);\n            --tp-input-background-color-focus: hsla(230, 28%, 18%, 1.00);\n            --tp-input-background-color-hover: hsla(230, 20%, 13%, 1.00);\n            --tp-input-foreground-color: hsla(230, 10%, 80%, 1.00);\n            --tp-label-foreground-color: hsla(230, 12%, 48%, 1.00);\n            --tp-monitor-background-color: hsla(230, 20%, 8%, 1.00);\n            --tp-monitor-foreground-color: hsla(230, 12%, 48%, 1.00);\n            --tp-helper-color: var(--tp-base-background-color);\n            --tp-helper-bg: var(--tp-button-background-color);\n        ";
				}
				jetblack() {
					return "\n            --tp-base-background-color: hsla(0, 0%, 0%, 1.00);\n            --tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);\n            --tp-button-background-color: hsla(0, 0%, 70%, 1.00);\n            --tp-button-background-color-active: hsla(0, 0%, 85%, 1.00);\n            --tp-button-background-color-focus: hsla(0, 0%, 80%, 1.00);\n            --tp-button-background-color-hover: hsla(0, 0%, 75%, 1.00);\n            --tp-button-foreground-color: hsla(0, 0%, 0%, 1.00);\n            --tp-container-background-color: hsla(0, 0%, 10%, 1.00);\n            --tp-container-background-color-active: hsla(0, 0%, 25%, 1.00);\n            --tp-container-background-color-focus: hsla(0, 0%, 20%, 1.00);\n            --tp-container-background-color-hover: hsla(0, 0%, 15%, 1.00);\n            --tp-container-foreground-color: hsla(0, 0%, 50%, 1.00);\n            --tp-groove-foreground-color: hsla(0, 0%, 10%, 1.00);\n            --tp-input-background-color: hsla(0, 0%, 10%, 1.00);\n            --tp-input-background-color-active: hsla(0, 0%, 25%, 1.00);\n            --tp-input-background-color-focus: hsla(0, 0%, 20%, 1.00);\n            --tp-input-background-color-hover: hsla(0, 0%, 15%, 1.00);\n            --tp-input-foreground-color: hsla(0, 0%, 70%, 1.00);\n            --tp-label-foreground-color: hsla(0, 0%, 50%, 1.00);\n            --tp-monitor-background-color: hsla(0, 0%, 8%, 1.00);\n            --tp-monitor-foreground-color: hsla(0, 0%, 48%, 1.00);\n            --tp-helper-color: var(--tp-base-background-color);\n            --tp-helper-bg: var(--tp-button-background-color);\n        ";
				}
				light() {
					return "\n            --tp-base-background-color: hsla(230, 5%, 90%, 1.00);\n            --tp-base-shadow-color: hsla(0, 0%, 0%, 0.10);\n            --tp-button-background-color: hsla(230, 7%, 75%, 1.00);\n            --tp-button-background-color-active: hsla(230, 7%, 60%, 1.00);\n            --tp-button-background-color-focus: hsla(230, 7%, 65%, 1.00);\n            --tp-button-background-color-hover: hsla(230, 7%, 70%, 1.00);\n            --tp-button-foreground-color: hsla(230, 10%, 30%, 1.00);\n            --tp-container-background-color: hsla(230, 15%, 30%, 0.20);\n            --tp-container-background-color-active: hsla(230, 15%, 30%, 0.32);\n            --tp-container-background-color-focus: hsla(230, 15%, 30%, 0.28);\n            --tp-container-background-color-hover: hsla(230, 15%, 30%, 0.24);\n            --tp-container-foreground-color: hsla(230, 10%, 30%, 1.00);\n            --tp-groove-foreground-color: hsla(230, 15%, 30%, 0.10);\n            --tp-input-background-color: hsla(230, 15%, 30%, 0.10);\n            --tp-input-background-color-active: hsla(230, 15%, 30%, 0.22);\n            --tp-input-background-color-focus: hsla(230, 15%, 30%, 0.18);\n            --tp-input-background-color-hover: hsla(230, 15%, 30%, 0.14);\n            --tp-input-foreground-color: hsla(230, 10%, 30%, 1.00);\n            --tp-label-foreground-color: hsla(230, 10%, 30%, 0.70);\n            --tp-monitor-background-color: hsla(230, 15%, 30%, 0.10);\n            --tp-monitor-foreground-color: hsla(230, 10%, 30%, 0.50);\n            --tp-helper-color: var(--tp-button-foreground-color);\n            --tp-helper-bg: var(--tp-button-background-color);\n        ";
				}
				retro() {
					return "\n            --tp-base-background-color: hsla(40, 3%, 90%, 1.00);\n            --tp-base-shadow-color: hsla(0, 0%, 0%, 0.30);\n            --tp-button-background-color: hsla(40, 3%, 70%, 1.00);\n            --tp-button-background-color-active: hsla(40, 3%, 55%, 1.00);\n            --tp-button-background-color-focus: hsla(40, 3%, 60%, 1.00);\n            --tp-button-background-color-hover: hsla(40, 3%, 65%, 1.00);\n            --tp-button-foreground-color: hsla(40, 3%, 20%, 1.00);\n            --tp-container-background-color: hsla(40, 3%, 70%, 1.00);\n            --tp-container-background-color-active: hsla(40, 3%, 55%, 1.00);\n            --tp-container-background-color-focus: hsla(40, 3%, 60%, 1.00);\n            --tp-container-background-color-hover: hsla(40, 3%, 65%, 1.00);\n            --tp-container-foreground-color: hsla(40, 3%, 20%, 1.00);\n            --tp-groove-foreground-color: hsla(40, 3%, 40%, 1.00);\n            --tp-input-background-color: hsla(120, 3%, 20%, 1.00);\n            --tp-input-background-color-active: hsla(120, 3%, 35%, 1.00);\n            --tp-input-background-color-focus: hsla(120, 3%, 30%, 1.00);\n            --tp-input-background-color-hover: hsla(120, 3%, 25%, 1.00);\n            --tp-input-foreground-color: hsla(120, 40%, 60%, 1.00);\n            --tp-label-foreground-color: hsla(40, 3%, 50%, 1.00);\n            --tp-monitor-background-color: hsla(120, 3%, 20%, 1.00);\n            --tp-monitor-foreground-color: hsla(120, 40%, 60%, 0.80);\n            --tp-helper-color: var(--tp-button-foreground-color);\n            --tp-helper-bg: var(--tp-button-background-color);\n        ";
				}
				vivid() {
					return "\n            --tp-base-background-color: hsla(0, 80%, 40%, 1.00);\n            --tp-base-shadow-color: hsla(0, 0%, 0%, 0.20);\n            --tp-button-background-color: hsla(0, 0%, 100%, 1.00);\n            --tp-button-background-color-active: hsla(0, 0%, 85%, 1.00);\n            --tp-button-background-color-focus: hsla(0, 0%, 90%, 1.00);\n            --tp-button-background-color-hover: hsla(0, 0%, 95%, 1.00);\n            --tp-button-foreground-color: hsla(230, 20%, 11%, 1.00);\n            --tp-container-background-color: hsla(0, 0%, 0%, 0.20);\n            --tp-container-background-color-active: hsla(0, 0%, 0%, 0.35);\n            --tp-container-background-color-focus: hsla(0, 0%, 0%, 0.30);\n            --tp-container-background-color-hover: hsla(0, 0%, 0%, 0.25);\n            --tp-container-foreground-color: hsla(0, 0%, 100%, 0.90);\n            --tp-groove-foreground-color: hsla(0, 0%, 0%, 0.50);\n            --tp-input-background-color: hsla(0, 0%, 0%, 0.50);\n            --tp-input-background-color-active: hsla(0, 0%, 0%, 0.65);\n            --tp-input-background-color-focus: hsla(0, 0%, 0%, 0.60);\n            --tp-input-background-color-hover: hsla(0, 0%, 0%, 0.55);\n            --tp-input-foreground-color: hsla(0, 0%, 100%, 0.90);\n            --tp-label-foreground-color: hsla(0, 0%, 100%, 0.90);\n            --tp-monitor-background-color: hsla(0, 0%, 0%, 0.50);\n            --tp-monitor-foreground-color: hsla(0, 0%, 100%, 0.50);\n            --tp-helper-color: var(--tp-base-background-color);\n            --tp-helper-bg: var(--tp-button-background-color);\n        ";
				}
			}
		},
		874: (a, c, d) => {
			d.d(c, {
				A: () => h,
				F: () => f
			});
			var e = d(209);
			const f = {
				None: 0,
				LessX: 1,
				GreaterX: 2,
				LessY: 4,
				GreaterY: 8,
				LessZ: 16,
				GreaterZ: 32
			};
			const g = {
				space: {
					maxXY: 499,
					maxZ: 3399,
					minZ: 99
				},
				default: {
					maxXY: 499,
					maxZ: 1999,
					minZ: 99
				},
				remaster: {
					maxXY: -14200,
					maxZ: 1790,
					minZ: 99
				}
			};
			class h {
				isArrayPressed = b => b !== "" && !!this.getKeyState(b);
				isArrayPressed2 = c => {
					if (!this.isArrayValid(c)) {
						return false;
					}
					for (let a of c) {
						if (!this.getKeyState(a)) {
							return false;
						}
					}
					return true;
				};
				isBindPressed = a => {
					if (unsafeWindow.menu.isOpen) {
						return false;
					}
					let b = a.bind;
					if ("pressed" in b) {
						let c = this.isArrayPressed(b.key);
						if (b.pressed === false) {
							if (c === true) {
								b.pressed = true;
								return true;
							}
						} else if (c !== true) {
							b.pressed = false;
							return false;
						}
						return false;
					}
					return this.isArrayPressed(b.key);
				};
				getKeyState = b => e.kp.isKeyPressed(b) && !this.isChatOpen();
				isChatOpen = () => document.querySelectorAll("input:not(#panelContainer input)").length > 0;
				isArrayValid = b => b !== undefined && Array.isArray(b) && b.length > 0;
				getKillZone = b => {
					if (!b) {
						return;
					}
					let a = b[battleMapComponent.gravity] === 300 ? g.space : g.default;
					return {
						minX: b[battleMapComponent.bounds]?.[aabb.minX] - a.maxXY,
						minY: b[battleMapComponent.bounds]?.[aabb.minY] - a.maxXY,
						minZ: b[battleMapComponent.bounds]?.[aabb.minZ] - a.minZ,
						maxX: b[battleMapComponent.bounds]?.[aabb.maxX] + a.maxXY,
						maxY: b[battleMapComponent.bounds]?.[aabb.maxY] + a.maxXY,
						maxZ: b[battleMapComponent.bounds]?.[aabb.maxZ] + a.maxZ,
						boundMaxZ: b[battleMapComponent.bounds]?.[aabb.maxZ],
						boundMinZ: b[battleMapComponent.bounds]?.[aabb.minZ]
					};
				};
				isNotKillZone = c => {
					let a = gameMode.battleMapComponent;
					let d = f.None;
					if (!a) {
						return d;
					}
					let g = this.getKillZone(a);
					if (c.x !== 0 && c.x >= g.maxX) {
						d |= f.GreaterX;
					}
					if (c.x !== 0 && c.x <= g.minX) {
						d |= f.LessX;
					}
					if (c.y !== 0 && c.y >= g.maxY) {
						d |= f.GreaterY;
					}
					if (c.y !== 0 && c.y <= g.minY) {
						d |= f.LessY;
					}
					if (c.z !== 0 && c.z >= g.maxZ) {
						d |= f.GreaterZ;
					}
					if (c.z !== 0 && c.z <= g.minZ) {
						d |= f.LessZ;
					}
					return d;
				};
				outKillZone = (c, e) => {
					let a = gameMode.battleMapComponent;
					if (!a) {
						return;
					}
					let d = this.getKillZone(a);
					if (e & f.GreaterX) {
						c.x = d.maxX;
					}
					if (e & f.LessX) {
						c.x = d.minX;
					}
					if (e & f.GreaterY) {
						c.y = d.maxY;
					}
					if (e & f.LessY) {
						c.y = d.minY;
					}
					if (e & f.GreaterZ) {
						c.z = d.maxZ;
					}
					if (e & f.LessZ) {
						c.z = d.minZ;
					}
				};
				isTankEnemy = c => {
					if (c === localTank.components) {
						return false;
					}
					let a = localTank?.tankComponent?.[tankComponent.team]?.[battleTeam.name];
					return !a || a === "NONE" || a !== localTank?.othersTankComponent(c)?.[tankComponent.team][battleTeam.name];
				};
				getUsername = a => {
					let b = localTank.userTitle(a);
					getName(userTitleComponent, "userTitleConfiguration", "userTitleComponent", b, 13);
					getName(userTitleConfiguration, "name", "userTitleConfiguration", b?.[userTitleComponent.userTitleConfiguration], 0);
					getName(userTitleConfiguration, "clan", "userTitleConfiguration", b?.[userTitleComponent.userTitleConfiguration], 1);
					return b?.[userTitleComponent.userTitleConfiguration]?.[userTitleConfiguration.clan] ? " [" + b?.[userTitleComponent.userTitleConfiguration]?.[userTitleConfiguration.clan] + "] " + b?.[userTitleComponent.userTitleConfiguration]?.[userTitleConfiguration.name] : b?.[userTitleComponent.userTitleConfiguration]?.[userTitleConfiguration.name];
				};
				debounce(func, delay) {
					let timeoutId;
					return function (...args) {
						clearTimeout(timeoutId);
						timeoutId = setTimeout(() => func.apply(this, args), delay);
					};
				};
				getTankByUsername = a => {
					if (!a) {
						return;
					}
					let c = this.getTanks(true);
					if (this.isArrayValid(c)) {
						for (let b of c) {
							if (this.getUsername(b) === a) {
								return b;
							}
						}
					}
				};
				refreshTarget = (b, c) => b && b.length > 0 ? b : this.getByUsername(c);
				getClass = function (b, c) {
					for (let a in b) {
						if (b[a]?.constructor?.name === c && typeof b[a] == "object") {
							return b[a];
						}
					}
				};
				calculateDistance(c, d) {
					let e = d[vector3.x] - c[vector3.x];
					let f = d[vector3.y] - c[vector3.y];
					let a = d[vector3.z] - c[vector3.z];
					return Math.sqrt(e * e + f * f + a * a);
				}
				getTanks = (a = false) => {
					const b = gameMode.battleMapComponent?.[battleMapComponent.gameMode]?.[tanksOnFieldRegistryImpl.tanksOnField]?.[tanksOnFieldRegistryImpl.getTanks]?.()[nativeList.array];
					if (!this.isArrayValid(b)) {
						return;
					}
					const f = [];
					for (const d of b) {
						const b = d[battleEntity.components][nativeList.array];
						if (b.length !== localTank.components?.length) {
							if (!a || !!this.isTankEnemy(b)) {
								b.entity = d;
								f.push(b);
							}
						}
					}
					return f;
				};
				getTankById = (e, g = false) => {
					let a = gameMode.battleMapComponent?.[battleMapComponent.gameMode]?.[tanksOnFieldRegistryImpl.tanksOnField];
					if (!a) {
						return;
					}
					let b = a[tanksOnFieldRegistryImpl.getTankById]?.(e);
					if (!b) {
						return;
					}
					let c = b[battleEntity.components][nativeList.array];
					if (c) {
						f.entity = b;
						if (f.length === localTank.components?.length || g && !this.isTankEnemy(c)) {
							return undefined;
						} else {
							return c;
						}
					} else {
						return undefined;
					}
				};
				getUniqueRandomArbitrary = (c, b, d, e) => {
					let f = this.getRandomArbitrary(d, e);
					if (f <= c + b && f >= c - b) {
						return this.getUniqueRandomArbitrary(c, b, d, e);
					} else {
						return f;
					}
				};
				getRandomArbitrary = (b, c) => Math.floor(Math.random() * (c - b) + b);
				minesCounter() {
					let b = 0;
					if (unsafeWindow.config.data.removeMinesData.bind.state) {
						return b;
					}
					let d = gameMode.minesOnFieldComponent;
					if (d && typeof d == "object") {
						if (d?.[rmmine.path1]?.[rmmine.path2]?.[rmmine.count] && typeof d?.[rmmine.path1]?.[rmmine.path2]?.[rmmine.count] == "number") {
							b = d?.[rmmine.path1]?.[rmmine.path2]?.[rmmine.count];
						}
						if (b < 10000) {
							return b.toString();
						} else if (b < 1000000) {
							return (b / 1000).toFixed(1) + "k";
						} else {
							return (b / 1000000).toFixed(1) + "m";
						}
					} else {
						return b;
					}
				}
			}
		},
		98: (d, f, b) => {
			b.d(f, {
				A: () => a
			});
			let g = {};
			let h = unsafeWindow.WebSocket;
			class e {
				constructor(b) {
					this.bubbles = b.bubbles || false;
					this.cancelBubble = b.cancelBubble || false;
					this.cancelable = b.cancelable || false;
					this.currentTarget = b.currentTarget || null;
					this.data = b.data || null;
					this.defaultPrevented = b.defaultPrevented || false;
					this.eventPhase = b.eventPhase || 0;
					this.lastEventId = b.lastEventId || "";
					this.origin = b.origin || "";
					this.path = b.path || new Array(0);
					this.ports = b.parts || new Array(0);
					this.returnValue = b.returnValue || true;
					this.source = b.source || null;
					this.srcElement = b.srcElement || null;
					this.target = b.target || null;
					this.timeStamp = b.timeStamp || null;
					this.type = b.type || "message";
					this.__proto__ = b.__proto__ || MessageEvent.__proto__;
				}
			}
			unsafeWindow.WebSocket = function (a, c) {
				let d;
				this.url = a;
				this.protocols = c;
				d = this.protocols ? new h(a, c) : new h(a);
				var b = d.send;
				var x = unsafeWindow.config.data.clickerData;
				d.send = function (c) {
					arguments[0] = g.before(c, d.url, d) || c;
					if (x.autoMiningData.state && c.byteLength === 19 && clicker.readDataView(c) === "4222452873967973") {
						for (let f = 0; f < x.autoMiningData.multiply; f++) {
							if (unsafeWindow.packetControl.responseTime < 150) {
								b.apply(this, arguments);
							}
						}
					}
					b.apply(this, arguments);
				};
				d._addEventListener = d.addEventListener;
				d.addEventListener = function () {
					let c = this;
					var a;
					if (arguments[0] === "message") {
						a = arguments[1];
						arguments[1] = function () {
							arguments[0] = g.after(new e(arguments[0]), d.url, d);
							if (arguments[0] !== null) {
								a.apply(c, arguments);
							}
						};
					}
					return d._addEventListener.apply(this, arguments);
				};
				Object.defineProperty(d, "onmessage", {
					set: function () {
						let c = this;
						let a = arguments[0];
						d._addEventListener.apply(this, ["message", function () {
							arguments[0] = g.after(new e(arguments[0]), d.url, d);
							if (arguments[0] !== null) {
								a.apply(c, arguments);
							}
						}, false]);
					}
				});
				return d;
			};
			const a = g;
		},
		173: (Y, a, g) => {
			g.d(a, {
				I6: () => J
			});
			var e = g(874);
			var c = g(421);
			var h = g(336);
			var b = g(987);
			var d = g(580);
			var f = g(360);
			var i = g(281);
			var j = g(905);
			var k = g(660);
			var l = g(566);
			var m = g(537);
			var n = g(539);
			var o = g(100);
			var p = g(384);
			var q = g(146);
			var r = g(471);
			var s = g(27);
			var t = g(157);
			var u = g(825);
			var v = g(497);
			var w = g(362);
			var x = g(579);
			var y = g(382);
			var z = g(986);
			var A = g(316);
			var B = g(979);
			const C = unsafeWindow.finder = new x.A();
			const D = unsafeWindow.utils = new e.A();
			unsafeWindow.config = new c.A();
			const E = unsafeWindow.base = new y.A();
			const F = unsafeWindow.gameMode = new z.A();
			const G = unsafeWindow.localTank = new A.A();
			const H = unsafeWindow.world = new B.A();
			unsafeWindow.themeManager = new w.A();
			const I = unsafeWindow.menu = new i.A();
			const J = unsafeWindow.packetControl = new r.A();
			const K = unsafeWindow.removeMines = new b.A();
			const L = unsafeWindow.airBreak = new d.A();
			const M = unsafeWindow.other = new j.A();
			const N = unsafeWindow.clicker = new p.A();
			const O = unsafeWindow.wallhack = new q.A();
			const P = unsafeWindow.striker = new s.A();
			const Q = unsafeWindow.stick = new n.A();
			unsafeWindow.sync = new o.A();
			const R = unsafeWindow.cameraHack = new f.A();
			const S = unsafeWindow.physicsHack = new l.A();
			const T = unsafeWindow.bulletTP = new k.A();
			const U = unsafeWindow.aimbot = new v.A();
			const V = unsafeWindow.filters = new t.A();
			function W() {
				C.reset();
				L.reset();
				N.reset();
				U.reset();
				K.reset();
				T.reset();
				R.reset();
				P.reset();
				S.reset();
				I.reset();
			}
			unsafeWindow.message = new h.A();
			new m.A();
			(function c() {
				//setTimeout(c, 16);
				requestAnimationFrame(c);
				if (!E.root) {
					return;
				}
				const a = E.root?.[rootComponent.state]?.[TOState.shop];
				if (a?.[unsafeWindow.shop.enabled] === false) {
					a[unsafeWindow.shop.enabled] = true;
				}
				if (H.components) {
					(0, u.C)();
					K.process();
					O.process();
					V.process();
					if (G.components && D.isArrayValid(G.components)) {
						const c = G.physics;
						const b = G.followCamera;
						U.process();
						M.process(c, b);
						L.process(c, b);
						Q.process(c);
						N.process();
						T.process(c);
						S.process(c);
						P.process();
						R.process(b);
					} else {
						W();
					}
				} else {
					E.reset();
					G.reset();
					H.reset();
					F.reset();
					W();
				}
			})();
		}
	};
	var b = {};
	function arr(d) {
		var c = b[d];
		if (c !== undefined) {
			return c.exports;
		}
		var f = b[d] = {
			exports: {}
		};
		a[d](f, f.exports, arr);
		return f.exports;
	}
	arr.d = (a, b) => {
		for (var c in b) {
			if (arr.o(b, c) && !arr.o(a, c)) {
				Object.defineProperty(a, c, {
					enumerable: true,
					get: b[c]
				});
			}
		}
	};
	arr.o = (c, a) => Object.prototype.hasOwnProperty.call(c, a);
	arr(173);
	arr(825);
	arr(421);
	arr(579);
	arr(555);
	arr(209);
	arr(727);
	arr(281);
	arr(336);
	arr(362);
	arr(874);
	arr(98);
	arr(157);
	arr(471);
	arr(382);
	arr(986);
	arr(316);
	arr(979);
	arr(497);
	arr(580);
	arr(75);
	arr(660);
	arr(360);
	arr(384);
	arr(537);
	arr(905);
	arr(566);
	arr(987);
	arr(685);
	arr(539);
	arr(27);
	arr(100);
	arr(146);
})();