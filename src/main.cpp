#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

int sumProperDivisors(int n) {
    if (n == 1) return 0;
    
    int sum = 1; // 1 is a proper divisor for all n > 1
    // Efficiently find divisors up to sqrt(n)
    for (int i = 2; i <= sqrt(n); ++i) {
        if (n % i == 0) {
            if (i == n / i)
                sum += i;
            else
                sum += i + n / i;
        }}
    return sum;
}

int main() {
    ios::sync_with_stdio(false); // Speed up input/output
    cin.tie(nullptr);
    
    int n;
    cin >> n;
    vector<int> numbers(n);
    for (int i = 0; i < n; ++i) {
        cin >> numbers[i];
    }
    
    // Vector of pairs: (number, sum of proper divisors)
    vector<pair<int, int>> numDivSum;
    for (int num : numbers) {
        numDivSum.emplace_back(num, sumProperDivisors(num));
    }
    
    // Sort by the sum of proper divisors
    sort(numDivSum.begin(), numDivSum.end(), 
        [](const pair<int, int>& a, const pair<int, int>& b) {
            return a.second < b.second;
        });
    
    // Output each number and its divisor sum in parentheses
    for (const auto& pair : numDivSum) {
        cout << pair.first << "(" << pair.second << ") ";
    }
    
    return 0;
}