import { describe, assert, expect, test,vi } from 'vitest'
import MyPromise from "../src/code/myCustomPromise";

describe("My Promise",()=>{
    test("1. should resolve immediately", () => {
        return new MyPromise((resolve) => resolve(42)).then((value) => {
            console.log("value",value)
            expect(value).toBe(42);
        });
    });

    test("2. should reject immediately", () => {
        return new MyPromise((_, reject) => reject("error")).catch((err) => {
            expect(err).toBe("error");
        });
    });

    test("3. should resolve asynchronously", (done) => {
        new MyPromise((resolve) => setTimeout(() => resolve(99), 100))
            .then((value) => {
                expect(value).toBe(99);
                done();
            });
    });

    test("4. should reject asynchronously", (done) => {
        new MyPromise((_, reject) => setTimeout(() => reject("delayed error"), 100))
            .catch((err) => {
                expect(err).toBe("delayed error");
                done();
            });
    });

    test("5. should chain multiple then calls", () => {
        return new MyPromise((resolve) => resolve(1))
            .then((value) => value + 1)
            .then((value) => value * 2)
            .then((value) => {
                expect(value).toBe(4);
            });
    });

    test("6. should catch errors in then", () => {
        return new MyPromise((resolve) => resolve(5))
            .then(() => {
                throw new Error("Oops!");
            })
            .catch((err) => {
                expect(err.message).toBe("Oops!");
            });
    });

    test("7. should execute finally on resolve", () => {
        let flag = false;
        return new MyPromise((resolve) => resolve(10))
            .finally(() => {
                flag = true;
            })
            .then((value) => {
                expect(value).toBe(10);
                expect(flag).toBe(true);
            });
    });

    test("8. should execute finally on reject", () => {
        let flag = false;
        return new MyPromise((_, reject) => reject("failure"))
            .finally(() => {
                flag = true;
            })
            .catch((err) => {
                expect(err).toBe("failure");
                expect(flag).toBe(true);
            });
    });

    test("9. should ignore reject after resolve", () => {
        return new MyPromise((resolve, reject) => {
            resolve("done");
            reject("error");
        }).then((value) => {
            expect(value).toBe("done");
        });
    });

    test("10. should ignore resolve after reject", () => {
        return new MyPromise((resolve, reject) => {
            reject("fail");
            resolve("success");
        }).catch((err) => {
            expect(err).toBe("fail");
        });
    });

    test("11. should handle nested MyPromise", () => {
        return new MyPromise((resolve) => {
            resolve(new MyPromise((resolve) => resolve(77)));
        }).then((value) => {
            expect(value).toBe(77);
        });
    });

    test("12. should resolve successfully", (done) => {
        const promise = new MyPromise((resolve) => {
            resolve("Success");
        });
        
        promise.then((value) => {
            expect(value).toBe("Success");
            done();
        });
    });

    test("13. should reject properly", (done) => {
        const promise = new MyPromise((_, reject) => {
            reject("Error");
        });
        
        promise.catch((error) => {
            expect(error).toBe("Error");
            done();
        });
    });

    test("14. should chain then correctly", (done) => {
        const promise = new MyPromise((resolve) => {
            resolve(2);
        });

        promise
            .then((value) => value * 2)
            .then((value) => {
                expect(value).toBe(4);
                done();
            });
    });

    test("15. should propagate rejection to catch", (done) => {
        const promise = new MyPromise((_, reject) => {
            reject("Failed");
        });

        promise
            .then(() => "Won't execute")
            .catch((error) => {
                expect(error).toBe("Failed");
                done();
            });
    });

    test("16. should execute finally block regardless of resolution or rejection", (done) => {
        const mockFn = vi.fn();

        const promise = new MyPromise((resolve) => {
            resolve("Done");
        });

        promise
            .finally(() => {
                mockFn();
            })
            .then(() => {
                expect(mockFn).toHaveBeenCalled();
                done();
            });
    });

    test("17. should execute finally even after rejection", (done) => {
        const mockFn = vi.fn();

        const promise = new MyPromise((_, reject) => {
            reject("Error");
        });

        promise
            .finally(() => {
                mockFn();
            })
            .catch(() => {
                expect(mockFn).toHaveBeenCalled();
                done();
            });
    });

    test("18. should support multiple then calls", (done) => {
        const promise = new MyPromise((resolve) => {
            resolve(5);
        });

        promise.then((value) => {
            expect(value).toBe(5);
        });

        promise.then((value) => {
            expect(value).toBe(5);
            done();
        });
    });

    test("19. should handle errors inside then and pass to catch", (done) => {
        const promise = new MyPromise((resolve) => {
            resolve(5);
        });

        promise
            .then(() => {
                throw new Error("Something went wrong");
            })
            .catch((error) => {
                expect(error.message).toBe("Something went wrong");
                done();
            });
    });


    test("20. should propagate rejection through a chain", () => {
        return new MyPromise((resolve) => resolve(1))
            .then(() => {
                throw new Error("Chained error");
            })
            .then(() => {
                throw new Error("This should not execute");
            })
            .catch((err) => {
                expect(err.message).toBe("Chained error");
            });
    });

    test("21. should skip .then() when returning a rejected promise", () => {
        return new MyPromise((resolve) => resolve(10))
            .then(() => {
                return new MyPromise((_, reject) => reject("Inner rejection"));
            })
            .then(() => {
                throw new Error("This should not execute");
            })
            .catch((err) => {
                expect(err).toBe("Inner rejection");
            });
    });

    test("22. should execute multiple .then() calls even if added before resolution", (done) => {
        const promise = new MyPromise((resolve) => setTimeout(() => resolve(50), 100));

        const results = [];
        promise.then((value) => results.push(value));
        promise.then((value) => results.push(value + 1));

        setTimeout(() => {
            expect(results).toEqual([50, 51]);
            done();
        }, 200);
    });

    test("23. should execute .then() callbacks in correct order", () => {
        const results = [];
        return new MyPromise((resolve) => resolve(0))
            .then((value) => {
                results.push(value + 1);
                return value + 1;
            })
            .then((value) => {
                results.push(value + 1);
                return value + 1;
            })
            .then(() => {
                expect(results).toEqual([1, 2]);
            });
    });

    test("24. should call multiple .catch() handlers", () => {
        const promise = new MyPromise((_, reject) => reject("Failure"));

        const results = [];
        promise.catch((err) => results.push(err));
        promise.catch((err) => results.push(err + " again"));

        return promise.catch(() => {
            expect(results).toEqual(["Failure", "Failure again"]);
        });
    });

    test("25. should not alter the resolution value inside .finally()", () => {
        return new MyPromise((resolve) => resolve("Final value"))
            .finally(() => "Ignored")
            .then((value) => {
                expect(value).toBe("Final value");
            });
    });

    test("26. should not alter the rejection reason inside .finally()", () => {
        return new MyPromise((_, reject) => reject("Failure"))
            .finally(() => "Ignored")
            .catch((err) => {
                expect(err).toBe("Failure");
            });
    });


    test("27. should execute then asynchronously", (done) => {
        let syncCheck = false;
        new MyPromise((resolve) => resolve(42)).then(() => {
            expect(syncCheck).toBe(true);
            done();
        });
        syncCheck = true;
    });


    test("28. should execute catch asynchronously", (done) => {
        let syncCheck = false;
        new MyPromise((_, reject) => reject("error")).catch(() => {
            expect(syncCheck).toBe(true);
            done();
        });
        syncCheck = true;
    });
    
    test("29. should execute then handlers in order", () => {
        const results = [];
        return new MyPromise((resolve) => resolve(1))
            .then(() => results.push("first"))
            .then(() => results.push("second"))
            .then(() => {
                expect(results).toEqual(["first", "second"]);
            });
    });
    

    test("30. finally should not change resolved value", () => {
        return new MyPromise((resolve) => resolve("unchanged"))
            .finally(() => "ignored")
            .then((value) => {
                expect(value).toBe("unchanged");
            });
    });


    test("31. finally should not change rejection reason", () => {
        return new MyPromise((_, reject) => reject("error"))
            .finally(() => "ignored")
            .catch((err) => {
                expect(err).toBe("error");
            });
    });
    

    test("32. then should return a new promise", () => {
        const promise = new MyPromise((resolve) => resolve(1));
        const chainedPromise = promise.then((val) => val + 1);
    
        expect(chainedPromise).not.toBe(promise);
    });
    
    test('33. then should ignore non-function arguments', () => {
        return new MyPromise((resolve) => resolve(1))
            .then(null)
            .then('not a function')
            .then((value) => {
                expect(value).toBe(1);
            });
    });

    test('34. catch should ignore non-function arguments', () => {
        return new MyPromise((_, reject) => reject('error'))
            .catch(null)
            .catch('not a function')
            .catch((err) => {
                expect(err).toBe('error');
            });
    });

    test('35. then should handle thenable return values', () => {
        const thenable = {
            then: (resolve) => setTimeout(() => resolve(20), 50),
        };
        return new MyPromise((resolve) => resolve(10))
            .then(() => thenable)
            .then((value) => {
                expect(value).toBe(20);
            });
    });

    test('36. then should handle undefined return values', () => {
        return new MyPromise((resolve) => resolve(1)).then(() => {}).then((value)=>{expect(value).toBeUndefined()});
    });

    test('37. catch should handle undefined return values', () => {
        return new MyPromise((_, reject) => reject('error')).catch(() => {}).then((value)=>{expect(value).toBeUndefined()});
    });

    test('38. microtask queue test', (done) => {
      let flag = false;
      new MyPromise((resolve) => resolve()).then(() => {
        expect(flag).toBe(true);
        done();
      });
      flag = true;
    });

    test("39. should handle multiple then calls separately", () => {
        const promise = new MyPromise((resolve) => resolve(100));

        const results = [];
        promise.then((value) => results.push(value));
        promise.then((value) => results.push(value + 1));

        return promise.then(() => {
            expect(results).toEqual([100, 101]);
        });
    });
    
})

